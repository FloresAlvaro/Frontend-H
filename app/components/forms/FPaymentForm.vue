<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="form-row-2">
      <CInput
        v-model="form.reservation_id"
        label="Reserva"
        type="number"
        placeholder="ID reserva"
        required
      />

      <CInput
        v-model="form.amount"
        label="Monto"
        type="number"
        placeholder="0.00"
        required
      />
    </div>

    <div class="form-row-2">
      <CInput
        v-model="form.payment_method"
        label="Método de Pago"
        placeholder="cash"
      />

      <CInput
        v-model="form.payment_type"
        label="Tipo de Pago"
        placeholder="full"
      />
    </div>

    <div class="form-row">
      <CInput
        v-model="form.transaction_id"
        label="ID Transacción"
        placeholder="TRANS123456"
      />
    </div>

    <div class="form-row">
      <CInput
        v-model="form.notes"
        label="Notas"
        placeholder="Observaciones del pago"
      />
    </div>

    <div class="form-actions">
      <CButton variant="secondary" type="button" @click="handleCancel">
        Cancelar
      </CButton>
      <CButton variant="primary" type="submit" :loading="loading">
        Registrar Pago
      </CButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { CreatePaymentRequest } from '~/types';

interface Props {
  loading?: boolean;
}

defineProps<Props>();
const emit = defineEmits<{
  submit: [data: CreatePaymentRequest];
  cancel: [];
}>();

const form = ref({
  reservation_id: '',
  amount: '',
  payment_method: 'cash',
  payment_type: 'full',
  transaction_id: '',
  notes: ''
});

const handleSubmit = () => {
  emit('submit', form.value as CreatePaymentRequest);
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  gap: 16px;

  > :deep(div) {
    flex: 1;
  }
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>