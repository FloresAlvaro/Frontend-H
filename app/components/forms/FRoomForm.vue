<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="form-row-2">
      <CInput
        v-model="form.number"
        label="Número de Habitación"
        type="number"
        placeholder="101"
        required
      />

      <CInput
        v-model="form.floor"
        label="Piso"
        type="number"
        placeholder="1"
        required
      />
    </div>

    <div class="form-row">
      <CInput
        v-model="form.room_type_id"
        label="Tipo de Habitación"
        placeholder="1"
        required
      />
    </div>

    <div class="form-row">
      <CInput
        v-model="form.status"
        label="Estado"
        placeholder="available"
      />
    </div>

    <div class="form-row">
      <CInput
        v-model="form.description"
        label="Descripción"
        placeholder="Detalles de la habitación"
      />
    </div>

    <div class="form-actions">
      <CButton variant="secondary" type="button" @click="handleCancel">
        Cancelar
      </CButton>
      <CButton variant="primary" type="submit" :loading="loading">
        {{ isEditing ? 'Actualizar' : 'Guardar' }} Habitación
      </CButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { Room, CreateRoomRequest } from '~/types';

interface Props {
  room?: Room | null;
  loading?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  submit: [data: CreateRoomRequest];
  cancel: [];
}>();

const form = ref({
  number: '',
  floor: '',
  room_type_id: '',
  status: 'available',
  description: ''
});

const isEditing = computed(() => !!props.room);

watch(
  () => props.room,
  (room) => {
    if (room) {
      form.value = { ...room };
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit('submit', form.value as CreateRoomRequest);
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