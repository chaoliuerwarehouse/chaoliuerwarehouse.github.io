// Simple client-side checkout helper that generates copyable payment instructions.
// IMPORTANT: This does NOT process payments. Replace with a secure checkout or payment gateway for production.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form');
  const out = document.getElementById('payment-instructions');

  // TODO: update these merchant details to your real numbers
  const MERCHANT = {
    mtn: {name: 'Chaoliu Warehouse (MTN)', number: '0240000000'},
    vodafone: {name: 'Chaoliu Warehouse (Vodafone)', number: '0200000000'},
    bank: {name: 'Chaoliu Warehouse Ltd', account: '0123456789', bank: 'Ghana Commercial Bank'}
  };

  function genRef() {
    // short unique reference for manual reconciliation
    return 'CLW-' + Date.now().toString(36).toUpperCase().slice(-8);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      address: form.address.value.trim(),
      method: form.method.value,
      amount: Number(form.amount.value).toFixed(2),
      ref: genRef()
    };

    let html = `<strong>Order reference:</strong> ${data.ref}<br><br>`;
    if (data.method === 'mtn') {
      html += `<strong>Pay with MTN Mobile Money</strong><br>`;
      html += `1) Send <strong>GHS ${data.amount}</strong> to <strong>${MERCHANT.mtn.number}</strong> (Merchant: ${MERCHANT.mtn.name}).<br>`;
      html += `2) In the payment narration put: <em>${data.ref}</em> and your name.<br>`;
      html += `3) After payment, send the MM transaction ID or screenshot to <strong>${MERCHANT.mtn.number}</strong> or WhatsApp.`;
    } else if (data.method === 'vodafone') {
      html += `<strong>Pay with Vodafone Cash</strong><br>`;
      html += `1) Send <strong>GHS ${data.amount}</strong> to <strong>${MERCHANT.vodafone.number}</strong> (Merchant: ${MERCHANT.vodafone.name}).<br>`;
      html += `2) Put reference: <em>${data.ref}</em>.<br>`;
      html += `3) WhatsApp the transaction ID to the merchant number.`;
    } else if (data.method === 'bank') {
      html += `<strong>Bank Transfer</strong><br>`;
      html += `Account name: <strong>${MERCHANT.bank.name}</strong><br>`;
      html += `Bank: <strong>${MERCHANT.bank.bank}</strong><br>`;
      html += `Account number: <strong>${MERCHANT.bank.account}</strong><br>`;
      html += `Amount: <strong>GHS ${data.amount}</strong><br>`;
      html += `Use reference: <em>${data.ref}</em> and send payment proof to the merchant contact.`;
    } else {
      html += `<strong>Cash on Delivery</strong><br>`;
      html += `You will pay to the delivery rider on arrival. Please ensure the delivery address and phone are correct.`;
    }

    html += `<hr><strong>Customer</strong>: ${data.name} — ${data.phone}<br>`;
    html += `<strong>Delivery address:</strong> ${data.address}<br>`;
    html += `<p style="margin-top:0.5rem"><button id="copy-btn" class="btn">Copy Instructions</button></p>`;

    out.innerHTML = html;
    out.style.display = 'block';

    const copyBtn = document.getElementById('copy-btn');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(out.innerText || out.textContent).then(() => {
        alert('Instructions copied to clipboard. Paste into Mobile Money or WhatsApp.');
      }).catch(() => {
        alert('Unable to copy — please copy manually.');
      });
    });
  });
});