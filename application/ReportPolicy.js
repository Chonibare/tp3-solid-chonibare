export class FreePlanPolicy {
  assertAllowed(format) {
    if (format !== 'csv') {
      throw new Error('Le forfait gratuit autorise uniquement le format CSV');
    }
  }
}

export class ProPlanPolicy {
  assertAllowed() {
    // Le forfait Pro autorise tous les formats enregistrés.
  }
}
