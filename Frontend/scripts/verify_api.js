const { createClient } = require('@elmapicms/js-sdk');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const client = createClient({
  baseUrl: 'https://elmapicms.local/api',
  projectId: 'df1aacd0-af59-4089-a00e-072d1236e662',
  apiKey: 'IxUc0I4JY4SeCLtz4M1nDimPJNI49eqIEy5FPFJQe4d46129',
});

async function verify() {
  for (const loc of ['uz', 'ru', 'en']) {
    const zones = await client.content.list('sanoat-zonalari', { locale: loc });
    const projs = await client.content.list('loyihalar', { locale: loc });
    console.log(`[Locale: ${loc}] Zones: ${zones.length}, Projects: ${projs.length}`);
    if (zones[0]) {
      console.log(`  Zone: ${zones[0].fields.name}`);
      console.log(`    Infra: ${JSON.stringify(zones[0].fields.infrastructure)}`);
      console.log(`    Lot Desc: ${zones[0].fields['lot-description'].substring(0, 50)}...`);
      console.log(`    Lot URLs: ${JSON.stringify(zones[0].fields['lot-urls'])}`);
    }
    if (projs[0]) {
      console.log(`  Project: ${projs[0].fields.title}`);
      console.log(`    Company: ${projs[0].fields['company-name']}`);
      console.log(`    Invest: ${projs[0].fields['investment-amount']}`);
      console.log(`    Lot Desc: ${projs[0].fields['lot-description'].substring(0, 50)}...`);
    }
  }
}

verify().catch(console.error);
