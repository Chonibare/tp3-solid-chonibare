export function calculateSalesStats(orders, month) {
  const selectedOrders = orders.filter(
    order => order.date.startsWith(month) && order.status !== 'CANCELLED'
  );

  let revenueHT = 0;
  const byCategory = {};

  for (const order of selectedOrders) {
    for (const line of order.lines) {
      const amount = line.qty * line.unitPrice;
      revenueHT += amount;
      byCategory[line.category] = (byCategory[line.category] || 0) + amount;
    }
  }

  const vat = Math.round(revenueHT * 0.2 * 100) / 100;

  return {
    month,
    count: selectedOrders.length,
    revenueHT,
    vat,
    revenueTTC: revenueHT + vat,
    average: selectedOrders.length === 0
      ? 0
      : Math.round((revenueHT / selectedOrders.length) * 100) / 100,
    byCategory,
  };
}
