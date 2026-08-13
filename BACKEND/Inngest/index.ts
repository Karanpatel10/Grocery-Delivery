import { Inngest } from "inngest";
import { prisma } from "../Config/prisma.js";
import sendEmail from "../Config/nodeMailer.js";

const LOW_STOCK_THERESHOLD=10;

// Create a client to send and receive events
export const inngest = new Inngest({ id: "grocery-delivery" });

// Low stock to alert admin email
const checkLowStock = inngest.createFunction(
  { id: "check-low-stock",name:'Low stock Alert', triggers: [{ event: "inventory/stock.updated" }] },
  async ({ event, step }) => {
    const {productId}=event.data;
    const product=await step.run('fetch-product',async()=>{ return await prisma.product.findUnique({where:{id:productId}})})
 

  if(!product || product.stock == null || product.stock >=LOW_STOCK_THERESHOLD){
    return{skipped:true,stock:product?.stock}
  }

  await step.run("send-low-stock",async()=>{
    const adminEmails=process.env.ADMIN_EMAIL?process.env.ADMIN_EMAIL?.split(",").map((e)=>e.trim()):[];

    if(adminEmails?.length=== 0){
        return{skipped:true,reason:'No admin emails'}
    }

    await sendEmail({to:adminEmails?.join(","),subject:`Low stock alert ${product.name}`,body:`
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
                        <div style="background: linear-gradient(135deg, #dc2626, #ef4444); padding: 24px 28px;">
                            <h2 style="color: #fff; margin: 0; font-size: 20px;">Low Stock Alert</h2>
                        </div>
                        <div style="padding: 28px;">
                            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                                ${product.image ? `<img src="${product.image}" alt="${product.name}" style="width: 64px; height: 64px; border-radius: 12px; object-fit: cover;" />` : ""}
                                <div>
                                    <h3 style="margin: 0 0 4px; font-size: 18px; color: #111827;">${product.name}</h3>
                                    <p style="margin: 0; font-size: 14px; color: #6b7280;">${product.category} • ${product.unit}</p>
                                </div>
                            </div>
                            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px; text-align: center;">
                                <p style="margin: 0 0 4px; font-size: 13px; color: #991b1b; font-weight: 600;">CURRENT STOCK</p>
                                <p style="margin: 0; font-size: 32px; font-weight: 700; color: #dc2626;">${product.stock}</p>
                                <p style="margin: 4px 0 0; font-size: 12px; color: #6b7280;">units remaining</p>
                            </div>
                            <p style="margin: 20px 0 0; font-size: 13px; color: #9ca3af; text-align: center;">Please restock this item as soon as possible.</p>
                        </div>
                    </div>
    `})
  })

  return {alerted:true,product:product.name,stock:product.stock}
},
);

// Month offer Email (1st of every month-payday)

const sendMonthlyOffer=inngest.createFunction({id:"send-monthly-offers",name:"monthly payday offer",triggers:[{cron:"0 10 1 * *"}]
},async({step})=> {
    const {users,deals}=await step.run("fetch-deals-and-users",async()=>{
      // Get top discounted products as featured deals

      const products=await prisma.product.findMany({where:{stock:{gt:0}},orderBy:{originalPrice:"desc"},take:6})
      const allUsers=await prisma.user.findMany({select:{name:true,email:true}})
      return{deals:products,users:allUsers}
    })

    if(deals.length === 0 || users.length ===0){
      return {skipped:true, reason:"No users or deals"}
    }

    let sentCount=0;
    // send in batches of 10 to avoid overwhelming mail server
    const batchSize=10;

    for(let i=0;i<users.length;i+=batchSize){

        const batch=users.slice(i,i+batchSize);
        await step.run(`send-offers-batch-${i}`,async()=>{
          for(const u of batch){
              await sendEmail({to:u.email,subject:'Fresh Picks Just For You!',body:`
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
                
                <div style="background: linear-gradient(135deg, #f97316, #fb923c); padding: 24px 28px;">
                    <h2 style="color: #fff; margin: 0; font-size: 20px;">Fresh Picks Just For You!</h2>
                    <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 13px;">
                        Exclusive offers to kick off your month right
                    </p>
                </div>

                <div style="padding: 28px;">
                    <p style="margin: 0 0 20px; font-size: 15px; color: #374151;">
                        Hi <strong>${u.name}</strong>, check out this month's top picks!
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0">
                        ${deals.reduce((rows: any, _, i: number) => {
                                if (i % 3 === 0) {
                                    rows.push(deals.slice(i, i + 3));
                                }
                                return rows;
                            }, [])
                            .map(
                                (row: any) => `
                                <tr>
                                    ${row
                                        .map(
                                            (p: any) => `
                                            <td style="width: 33%; padding: 8px; vertical-align: top;">
                                                <div style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; text-align: center;">
                                                    ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100px; object-fit: cover;" />` : ""}
                                                    <div style="padding: 10px;">
                                                        <p style="margin: 0; font-size: 13px; font-weight: 600; color: #111827;">
                                                            ${p.name}
                                                        </p>
                                                        <p style="margin: 4px 0 0; font-size: 15px; font-weight: 700; color: #16a34a;">
                                                            $${p.price.toFixed(2)}
                                                            ${p.originalPrice > p.price ? `<span style="font-size: 11px; color: #9ca3af; text-decoration: line-through; margin-left: 4px;">$${p.originalPrice.toFixed(2)}</span>` : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>`
                                        )
                                        .join("")}
                                </tr>`
                            )
                            .join("")}
                    </table>

                    <div style="text-align: center; margin-top: 24px;">
                        <a href="${process.env.CLIENT_URL || "http://localhost:5173"}/products"
                           style="display: inline-block; background: #16a34a; color: #fff; padding: 12px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px;">
                           Shop All Deals →
                        </a>
                    </div>
                </div>
            </div>

                `});
                        }
                    });
                sentCount+=batch.length;
          }
          return {sent:sentCount};
        });

// Auto-Assign orders to delivery agents (every 5 minutes)
const autoAssignOrders=inngest.createFunction({
    id:"auto-assign-rider",
    name:"Auto assign orders to delivery agents",
    triggers:[{event:"order/placed"}],
   
},async({event,step})=>{
    const {orderId}=event.data;

    // wait  minutes berfore attempting assignmnet
    await step.sleep("wait-3-minutes","3m");

    const result=await step.run("assign-rider",async()=>{
        const order=await prisma.order.findUnique({where:{id:orderId}})

        // skipped if order doesn't exits,aleardy assigned or canclled

        if(!order) return {skipped:true,reason:"Order not found"};
        if(order.deliveryPartner) return{skipped:true,reason:"Already assigned"};
        if(["Cancelled","Delivered"].includes(order.status as string)) return {skipped:true,reason:`Order is ${order.status}`};

        // Find an active rider not currently delivering
        const busyOrder=await prisma.order.findMany({where:{status:{in:["Assigned","Packed","Out for Delivery"]},deliveryPartnerId:{not:null}},select:{deliveryPartnerId:true}})

        const busyRiderIds=busyOrder.map((o)=>o.deliveryPartnerId);

        const availableRider=await prisma.deliveryPartner.findFirst({where:{isActive:true,id:{notIn:busyRiderIds as string[]}}})

        if(!availableRider) return {skipped:true,reason:"No Riders Avaliable"}

        // Generate 6-digit OTP
        const otp=Math.floor(100000+Math.random()*900000).toString();
        console.log("generated otp:",otp);
        const history=(Array.isArray(order.statusHistory)?order.statusHistory:[]) as any[];
        history.push({status:'Assigned',note:`Auto-assigned to ${availableRider.name}`,timestamp:new Date()})

        await prisma.order.update({where:{id:orderId},data:{deliveryPartnerId:availableRider.id,deliveryOtp:otp,status:"Assigned",statusHistory:history}})

        return{assigned:true,riderId:availableRider.id,riderName:availableRider.name,orderId:orderId}
    })
    return result
})


// Send Payment Receipt
const sendPaymentReceipt=inngest.createFunction({
    id: "send-order-receipt",
    name: "Send order receipt",
    triggers: [{ event: "order/placed" }],
   
},async({event,step})=>{
    const {orderId}=event.data;
    const order = await step.run("fetch-order", async () => {
      return prisma.order.findUnique({where: { id: orderId },});
    });

    if (!order) {
      return {
        skipped: true,
        reason: "Order not found",
      };
    }
console.log("Receipt order data",order);
    const orderItems = Array.isArray(order.items)
  ? order.items
  : [];
 console.log("Receipt item data:",orderItems);
    // await step.run("send-receipt", async () => {
    //   await sendEmail({
    //     to: order.email, // adjust to your actual field
    //     subject: `Payment Receipt - Order #${order.id}`,
    //     body: `
    //     <!DOCTYPE html>
    //     <html>
    //     <head>
    //     <meta charset="UTF-8" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //     <title>Payment Receipt</title>
    //     </head>

    //     <body style="margin: 0;padding: 0;background-color: #f3f4f6;font-family: Arial, Helvetica, sans-serif;color: #111827;">

    //     <div style="width: 100%;padding: 40px 16px;box-sizing: border-box;">

    //         <div style="max-width: 620px;margin: 0 auto;background: #ffffff;border-radius: 18px;overflow: hidden;box-shadow: 0 4px 20px rgba(0,0,0,0.06);">

    //         <!-- Header -->
    //         <div style="background: linear-gradient(135deg, #16a34a, #22c55e);padding: 34px 30px;text-align: center;">

    //             <div style="width: 58px;height: 58px;margin: 0 auto 16px;background: rgba(255,255,255,0.18);border-radius: 50%;line-height: 58px;font-size: 28px;color: #ffffff;">
    //             ✓
    //             </div>

    //             <h1 style="margin: 0;color: #ffffff;font-size: 25px;font-weight: 700;">
    //             Payment Successful
    //             </h1>

    //             <p style="margin: 10px 0 0;color: rgba(255,255,255,0.9);font-size: 14px;">
    //             Thank you for your order!
    //             </p>

    //         </div>


    //         <!-- Receipt Content -->
    //         <div style="padding: 32px 30px;">

    //             <!-- Order Info -->
    //             <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
    //                 <tr>
    //                     <td style="width: 50%;vertical-align: top;">
    //                     <p style="margin: 0 0 6px;color: #9ca3af;font-size: 12px;text-transform: uppercase;letter-spacing: 0.5px;">
    //                         Order Number
    //                     </p>
    //                     <p style="margin: 0;color: #111827;font-size: 15px;font-weight: 700;">
    //                         #${order.id}
    //                     </p>
    //                     </td>
    //                     <td style="width: 50%;text-align: right;vertical-align: top;">
    //                     <p style="margin: 0 0 6px;color: #9ca3af;font-size: 12px;text-transform: uppercase;letter-spacing: 0.5px;">
    //                         Payment Status
    //                     </p>
    //                     <span style="display: inline-block;background: #dcfce7;color: #15803d;padding: 6px 12px;border-radius: 20px;font-size: 12px;font-weight: 700;">
    //                         PAID
    //                     </span>
    //                     </td>
    //                 </tr>
    //             </table>


    //             <!-- Divider -->
    //             <div style="height: 1px;background: #e5e7eb;margin-bottom: 24px;"></div>


    //             <!-- Items -->
    //             <h3 style="margin: 0 0 16px;color: #111827;font-size: 17px;">
    //             Order Summary
    //             </h3>


    //             ${orderItems.map((item: any) => `
    //             <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
    //                 <tr>
    //                 <td style="width: 52px;vertical-align: middle;">
    //                     ${
    //                     item.image
    //                         ? `<img src="${item.image}"width="48" height="48" style="display: block;border-radius: 10px;object-fit: cover;"/>`:
    //                          `<div style="width: 48px;height: 48px;background: #f3f4f6;border-radius: 10px;text-align: center;line-height: 48px;font-size: 20px;">
    //                             🛒
    //                         </div>`
    //                     }
    //                 </td>
    //                 <td style="padding-left: 12px;vertical-align: middle;">
    //                     <p style="margin: 0 0 4px;color: #111827;font-size: 14px;font-weight: 600;">
    //                     ${item.name}
    //                     </p>
    //                     <p style="margin: 0;color: #9ca3af;font-size: 12px;">
    //                     Qty: ${item.quantity}
    //                     </p>
    //                 </td>
    //                 <td style="text-align: right;vertical-align: middle;font-size: 14px;font-weight: 700;color: #111827;">
    //                     $${(item.price * item.quantity).toFixed(2)}
    //                 </td>
    //                 </tr>
    //             </table>
    //             `).join("")}


    //             <!-- Divider -->
    //             <div style="height: 1px;background: #e5e7eb;margin: 24px 0;"></div>


    //             <!-- Totals -->
    //             <table width="100%" cellpadding="0" cellspacing="0">
    //                 <tr>
    //                     <td style="padding: 6px 0;color: #6b7280;font-size: 14px;">
    //                     Subtotal
    //                     </td>
    //                     <td style="padding: 6px 0;text-align: right;color: #374151;font-size: 14px;">
    //                     $${order.subtotal?.toFixed(2) ?? "0.00"}
    //                     </td>
    //                 </tr>
    //                 <tr>
    //                     <td style="padding: 6px 0;color: #6b7280;font-size: 14px;">
    //                     Delivery
    //                     </td>
    //                     <td style="padding: 6px 0;text-align: right;color: #374151;font-size: 14px;">
    //                     $${order.deliveryFee?.toFixed(2) ?? "0.00"}
    //                     </td>
    //                 </tr>
    //                 <tr>
    //                     <td colspan="2">
    //                     <div style="height: 1px;background: #e5e7eb;margin: 12px 0;"></div>
    //                     </td>
    //                 </tr>
    //                 <tr>
    //                     <td style="padding: 4px 0;color: #111827;font-size: 18px;font-weight: 700;">
    //                     Total Paid
    //                     </td>
    //                     <td style="padding: 4px 0;text-align: right;color: #16a34a;font-size: 21px;font-weight: 700;">
    //                     $${order.total?.toFixed(2) ?? "0.00"}
    //                     </td>
    //                 </tr>
    //             </table>


    //             <!-- Payment Info -->
    //             <div style="margin-top: 28px;background: #f9fafb;border-radius: 12px;padding: 18px;">
    //                 <p style="margin: 0 0 8px;color: #374151;font-size: 13px;font-weight: 600;">
    //                     Payment Information
    //                 </p>
    //                 <p style="margin: 4px 0;color: #6b7280;font-size: 12px;">
    //                     Payment method: Card
    //                 </p>
    //                 <p style="margin: 4px 0;color: #6b7280;font-size: 12px;">
    //                     Payment status:
    //                     <span style="color: #16a34a; font-weight: 600;">
    //                     Successful
    //                     </span>
    //                 </p>
    //             </div>


    //             <!-- Thank You -->
    //             <div style="text-align: center;margin-top: 32px;">
    //                 <p style="margin: 0;color: #374151;font-size: 14px;">
    //                     Thank you for shopping with us! 💚
    //                 </p>
    //                 <p style="margin: 8px 0 0;color: #9ca3af;font-size: 12px;line-height: 1.5;">
    //                     Your order has been confirmed and is being prepared.
    //                 </p>
    //             </div>

    //         </div>


    //         <!-- Footer -->
    //         <div style="background: #f9fafb;padding: 22px 30px;text-align: center;border-top: 1px solid #e5e7eb;">
    //             <p style="margin: 0;color: #6b7280;font-size: 12px;">
    //             This is your payment receipt.
    //             </p>
    //             <p style="margin: 6px 0 0;color: #9ca3af;font-size: 11px;">
    //             © ${new Date().getFullYear()} Your Store. All rights reserved.
    //             </p>
    //         </div>

    //         </div>

    //     </div>

    //     </body>
    //     </html>
    //     `,
    //   });
    // });

    // return {
    //   sent: true,
    //   orderId,
    // };
})

export const functions = [checkLowStock,sendMonthlyOffer,autoAssignOrders,sendPaymentReceipt];