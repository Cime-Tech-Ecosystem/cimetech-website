/* ==========================================================================
   Cime Hub pricing. EDIT THIS FILE ONLY, no page layout needs to change.
   1. Fill in each "price" (in Naira, numbers only, e.g. 5000). Leave null to show "Request a quote".
   2. Set enabled: true to show the pricing section on the Hub page.
   3. Set vat.included to true or false to show a VAT note (leave null to hide it).
   ========================================================================== */
window.CIME_PRICING = {
  enabled: false,
  currency: '\u20A6',
  vat: { included: null },
  discounts: [
    { months: 3,  percent: 5 },
    { months: 6,  percent: 10 },
    { months: 12, percent: 15 }
  ],
  plans: [
    { name: 'Day Pass', billing: 'per day', price: null, monthly: false,
      includes: ['Hot desk from 9am to 6pm', 'Internet', 'Power backup', 'Refreshments'] },
    { name: 'Weekly Pass', billing: 'per week (5 days)', price: null, monthly: false,
      includes: ['Same as Day Pass', 'Lower daily rate'] },
    { name: 'Hot Desk', billing: 'per month', price: null, monthly: true,
      includes: ['Any available desk', 'Set number of meeting room hours per month'] },
    { name: 'Dedicated Desk', billing: 'per month', price: null, monthly: true, recommended: true,
      includes: ['Own fixed desk', 'Storage', 'More meeting room hours', 'Mail handling'] },
    { name: 'Team Plan', billing: 'per month', price: null, monthly: true,
      includes: ['A set number of desks for your team', 'Lower rate per seat', 'Shared meeting room hours'] },
    { name: 'Private Office', billing: 'per month, per seat', price: null, monthly: true, from: true, quote: true,
      includes: ['Lockable office', 'Priced per seat'] }
  ],
  rooms: [
    { name: 'Meeting Room and Boardroom',
      rates: [ { label: 'Per hour', price: null }, { label: 'Half day', price: null }, { label: 'Full day', price: null } ],
      includes: ['Screen', 'Internet', 'Refreshments'] },
    { name: 'Event Space',
      rates: [ { label: 'Half day', price: null }, { label: 'Full day', price: null } ],
      includes: ['Quote based, depending on numbers and setup'], quote: true }
  ],
  addons: ['Extra meeting room hours', 'Printing', 'Locker', 'Business address or virtual office service']
};
