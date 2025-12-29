document.addEventListener('DOMContentLoaded', () => {
  setupForm();
  
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId');
  
  if (orderId) {
    document.getElementById('order-id').value = orderId;
  }
});

function setupForm() {
  const form = document.getElementById('payment-form');
  form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(event) {
  event.preventDefault();
  
  const orderId = parseInt(document.getElementById('order-id').value);
  const amountInReais = parseFloat(document.getElementById('amount').value);
  const method = document.getElementById('method').value;
  const notes = document.getElementById('notes').value;
  
  if (!orderId || isNaN(orderId)) {
    alert('Please enter a valid Order ID');
    return;
  }
  
  if (isNaN(amountInReais) || amountInReais <= 0) {
    alert('Please enter a valid amount greater than zero');
    return;
  }
  
  if (!method) {
    alert('Please select a payment method');
    return;
  }
  
  const methodMap = {
    'CREDIT_CARD': 'CARD',
    'DEBIT_CARD': 'CARD',
    'PIX': 'PIX',
    'CASH': 'BOLETO',
    'BANK_TRANSFER': 'BOLETO'
  };
  
  const backendMethod = methodMap[method];
  
  if (!backendMethod) {
    alert('Invalid payment method selected');
    return;
  }
  
  const amountInCents = Math.round(amountInReais * 100);
  
  const paymentData = {
    orderId: orderId,
    amountCents: amountInCents,
    method: backendMethod,
    paidAt: new Date().toISOString()
  };
  
  if (notes && notes.trim()) {
    paymentData.notes = notes.trim();
  }
  
  try {
    console.log('Sending payment data:', paymentData);
    console.log('Amount in reais:', amountInReais);
    console.log('Amount in cents:', amountInCents);
    
    const createdPayment = await PaymentService.create(paymentData);
    
    console.log('Payment created:', createdPayment);
    alert(`Payment #${createdPayment.id} created successfully!`);
    
    window.location.href = `view.html?id=${createdPayment.id}`;
    
  } catch (error) {
    console.error('Full error:', error);
    console.error('Error response:', error.response);
    
    let errorMessage = 'Error creating payment:\n\n';
    
    if (error.response && error.response.data) {
      if (typeof error.response.data === 'string') {
        errorMessage += error.response.data;
      } else {
        errorMessage += JSON.stringify(error.response.data, null, 2);
      }
    } else if (error.message) {
      errorMessage += error.message;
    } else {
      errorMessage += 'Unknown error occurred';
    }
    
    alert(errorMessage);
  }
}