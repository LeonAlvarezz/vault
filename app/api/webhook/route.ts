/*
 * app/api/webhooks/billing/stripe/route.ts
 *
 *=================================================
 * Stripe Webhook Route.
 *=================================================
 * This route is used to handle Stripe Webhooks.
 * - https://stripe.com/docs/webhooks
 * @author gh/tego101
 * @version 1.0.0
 * @url https://github.com/tego101/nextjs-14-stripe-webhooks
 */
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "@/utils/env";
import { SUBCRIPTION_TIER } from "@/types/profiles.type";
import { createClient } from "@/lib/supabase/server";
import { updateSubscription } from "@/action/profile";

type EventName =
  // Checkout: https://stripe.com/docs/payments/checkout
  | "checkout.session.completed"
  | "checkout.session.async_payment_succeeded"
  | "checkout.session.async_payment_failed"
  | "checkout.session.expired"
  // Charge: https://stripe.com/docs/api/charges
  | "charge.succeeded"
  | "charge.failed"
  | "charge.refunded"
  | "charge.expired"
  // Disputes: https://stripe.com/docs/disputes
  | "charge.dispute.created"
  | "charge.dispute.updated"
  | "charge.dispute.funds_reinstated"
  | "charge.dispute.funds_withdrawn"
  | "charge.dispute.closed"
  // Customer: https://stripe.com/docs/api/customers
  | "customer.created"
  | "customer.updated"
  | "customer.deleted"
  | "customer.subscription.created"
  | "customer.subscription.updated"
  | "customer.subscription.deleted"
  | "customer.subscription.paused"
  | "customer.subscription.resumed";

async function handleStripeWebhook(body: any) {
  //   const id = body.data?.object?.id;
  //   const obj = body.data?.object?.object;
  //   const stat = body.data?.object?.status;
  //   const payment_intent = body.data?.object?.payment_intent;
  //   const user = body.data?.object?.metadata?.userId;
  const cid = body.data?.object?.client_reference_id as string;
  const type = body.type;
  //   console.log("user:", user);
  //   console.log("webhook type --->", type);
  //   console.log("id --->", id);
  //   console.log("obj --->", obj);
  //   console.log("stat --->", stat);
  //   console.log("payment_intent --->", payment_intent);

  //   console.table(body.data?.object);
  // console.log everything above REMOVE BEFORE PRODUCTION.
  //   console.log("mode --->", mode);
  //   console.log("status --->", status);
  //   console.log("subId --->", subId);
  //   console.log("stripeInvoiceId --->", stripeInvoiceId);
  //   console.log("user --->", user);
  //   console.log("meta --->", meta);
  //   console.log("stripe_invoice --->", stripe_invoice);

  const supabase = await createClient(env.SUPABASE_SERVER_ROLE_KEY);

  // Switch on the event type.
  switch (type) {
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Session Expired.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a session expires.
     */
    case "checkout.session.expired":
      // logic to handle expired sessions.

      return new Response(
        JSON.stringify({ message: "Payments marked canceled!" }),
        {
          status: 200,
        }
      );
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Charge: Succeeded.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a payment is successful.
     */
    case "charge.succeeded":
      // logic to handle successful charges.
      return new Response(JSON.stringify({ message: "Payment completed!" }), {
        status: 200,
      });
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Charge: Refunded.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a refund is completed.
     */
    case "charge.refunded":
      // logic to handle refunded charges.

      return new Response(JSON.stringify({ message: "Refund completed!" }), {
        status: 200,
      });
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Charge: Refunded.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a charge fails.
     */
    case "charge.failed":
      // logic to handle failed charges.

      return new Response(JSON.stringify({ message: "Payment Updated!" }), {
        status: 200,
      });
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Charge: Expired.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a charge expires.
     */
    case "charge.expired":
      // logic to handle expired charges.

      return new Response(JSON.stringify({ message: "Payment Updated!" }), {
        status: 200,
      });

    case "checkout.session.completed":
      // logic to handle successful charges.
      console.log("Changing");
      await updateSubscription(supabase, cid, SUBCRIPTION_TIER.PREMIUM);
      console.log("Completed");
      return new Response(JSON.stringify({ message: "Payment completed!" }), {
        status: 200,
      });
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * Customer: Created
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a new customer is created.
     */
    case "customer.created":
      // Add logic for handling customer creation
      return new Response(JSON.stringify({ message: "Customer created!" }), {
        status: 200,
      });

    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * Customer: Updated
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a customer's details are updated.
     */
    case "customer.updated":
      // Add logic for handling customer updates
      return new Response(JSON.stringify({ message: "Customer updated!" }), {
        status: 200,
      });

    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * Customer: Deleted
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a customer is deleted.
     */
    case "customer.deleted":
      // Add logic for handling customer deletion
      return new Response(JSON.stringify({ message: "Customer deleted!" }), {
        status: 200,
      });

    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * Customer Subscription: Created
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a customer's subscription is created.
     */
    case "customer.subscription.created":
      // Add logic for handling the creation of a customer subscription
      return new Response(
        JSON.stringify({ message: "Customer subscription created!" }),
        {
          status: 200,
        }
      );

    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * Customer Subscription: Updated
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a customer's subscription is updated.
     */
    case "customer.subscription.updated":
      // Add logic for handling updates to a customer's subscription
      return new Response(
        JSON.stringify({ message: "Customer subscription updated!" }),
        {
          status: 200,
        }
      );

    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * Customer Subscription: Deleted
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a customer's subscription is deleted.
     */
    case "customer.subscription.deleted":
      // Add logic for handling the deletion of a customer's subscription
      return new Response(
        JSON.stringify({ message: "Customer subscription deleted!" }),
        {
          status: 200,
        }
      );

    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * Customer Subscription: Paused
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a customer's subscription is paused.
     */
    case "customer.subscription.paused":
      // Add logic for handling the pausing of a customer's subscription
      return new Response(
        JSON.stringify({ message: "Customer subscription paused!" }),
        {
          status: 200,
        }
      );

    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * Customer Subscription: Resumed
     * =~~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a customer's subscription is resumed.
     */
    case "customer.subscription.resumed":
      // Add logic for handling the resumption of a customer's subscription
      return new Response(
        JSON.stringify({ message: "Customer subscription resumed!" }),
        {
          status: 200,
        }
      );

    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Default
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     */
    default:
      return new Response(JSON.stringify({ error: "Invalid event type" }), {
        status: 400,
      });
  }
}

async function POST(request: Request) {
  try {
    // Request Body.
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);

    let event;

    // Verify the webhook signature
    try {
      const stripeWebhookSecret = env.STRIPE_WEBHOOK_SECRET;
      if (!stripeWebhookSecret) {
        throw new Error("STRIPE_WEBHOOK_SECRET not set");
      }

      const sig = request.headers.get("Stripe-Signature");
      if (!sig) {
        throw new Error("Stripe Signature missing");
      }

      // Assuming you have a Stripe instance configured
      event = Stripe.webhooks.constructEvent(rawBody, sig, stripeWebhookSecret);
    } catch (err: any) {
      console.error(`⚠️  Webhook signature verification failed.`, err.message);
      return new Response(
        JSON.stringify({ error: "Webhook signature verification failed" }),
        {
          status: 400,
        }
      );
    }

    const webhookResponse = await handleStripeWebhook(event); // Ensure handleStripeWebhook is properly implemented

    return new Response(webhookResponse?.body, {
      status: webhookResponse?.status || 200,
    });
  } catch (error) {
    console.error("Error in Stripe webhook handler:", error);
    return new Response(JSON.stringify({ error: "Webhook handler failed." }), {
      status: 500, // Changed to 500, indicating a server error
    });
  }
}

async function GET() {
  // Bad Request or how ever you want to respond.
  return new Response(JSON.stringify({ error: "Bad Request" }), {
    status: 400, // Changed to 500, indicating a server error
  });
}

export { POST, GET };
