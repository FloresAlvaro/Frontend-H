<template>
  <CCard title="Clientes" v-if="true">
    <template #header-action>
      <CButton variant="primary" size="sm" icon="➕" @click="$emit('add')">
        Nuevo
      </CButton>
    </template>

    <CTable
      :columns="columns"
      :rows="clients"
      :pagination="pagination"
      :showPagination="true"
      @sort="handleSort"
      @prev-page="$emit('prev-page')"
      @next-page="$emit('next-page')"
    >
      <template #cell-document_number="{ value }">
        {{ formatDocument(value) }}
      </template>

      <template #cell-created_at="{ value }">
        {{ formatDate(value, 'DD/MM/YYYY') }}
      </template>

      <template #actions="{ row }">
        <CButton
          variant="secondary"
          size="sm"
          icon="✏️"
          @click="$emit('edit', row.id)"
        >
          Editar
        </CButton>
        <CButton
          variant="danger"
          size="sm"
          icon="🗑️"
          @click="$emit('delete', row.id)"
        >
          Eliminar
        </CButton>
      </template>
    </CTable>
  </CCard>
</template>

<script setup lang="ts">
import type { Client } from '~/types';
import { formatDocument, formatDate } from '~/utils/formatters';

interface Props {
  clients: Client[];
  pagination: any;
  loading?: boolean;
}

defineProps<Props>();
defineEmits<{
  add: [];
  edit: [id: number];
  delete: [id: number];
  'prev-page': [];
  'next-page': [];
  sort: [column: string];
}>();

const columns = [
  { key: 'name', label: 'Nombre', sortable: true },
  { key: 'email', label: 'Email', width: '200px' },
  { key: 'phone', label: 'Teléfono' },
  { key: 'document_number', label: 'Documento' },
  { key: 'created_at', label: 'Registrado' }
];
</script>