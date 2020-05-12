<template>
  <div class="q-pa-sm">
    <q-table
      :data="data"
      :columns="columns"
      row-key="name"
      title="All persons"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template
        v-slot:body-cell-photo="props"
      >
        <q-td
          auto-width
          :props="props"
        >
          <q-img
            :src="props.value"
            style="height: 140px;"
            :ratio="1"
          />
        </q-td>
      </template>
      <template
        v-slot:body-cell-actions="props"
      >
        <q-td
          auto-width
          :props="props"
        >
          <q-btn
            color="red"
            icon="delete"
            @click="deletePerson(props.row.id)"
            >
            <q-tooltip>Delete person from database</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { Notify } from 'quasar';

export default {
  name: 'AllPerson',
  data() {
    return {
      filter: '',
      columns: [
        {
          name: 'photo',
          label: 'Photo',
          align: 'left',
          field: (row) => row.url,
        },
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'surname',
          required: true,
          label: 'Surname',
          align: 'left',
          field: (row) => row.surname,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'phone',
          label: 'Phone',
          align: 'left',
          field: (row) => row.phone,
        },
        {
          name: 'job',
          label: 'Job',
          align: 'left',
          field: (row) => row.job,
        },
        {
          name: 'department',
          label: 'Department',
          align: 'left',
          field: (row) => row.department,
        },
        {
          name: 'position',
          label: 'Position',
          align: 'left',
          field: (row) => row.position,
        },
        {
          name: 'actions',
          label: 'Delete person',
          align: 'center',
          field: 'actions',
          sortable: false,
        },
      ],
      data: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.get('/static/storage.json')
        .then((response) => {
          this.data = response.data.users;
        });
    },
    deletePerson(id) {
      this.$api.get(`/api/remove?id=${id}`)
        .then(() => {
          Notify.create({
            message: 'Success',
            icon: 'thumb_up',
            color: 'positive',
            position: 'bottom-right',
          });
          this.getData();
        });
    },
  },
};
</script>

<style scoped lang="stylus">
  /deep/.q-table th:first-child
    min-width 140px
</style>
