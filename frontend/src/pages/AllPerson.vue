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
      <template v-slot:body="props">
        <q-tr :props="props">
        <q-td
          key="photo"
          auto-width
          :props="props"
        >
          <q-img
            :src="props.row.url"
            style="height: 140px;"
            :ratio="1"
          />
        </q-td>
          <q-td
            key="name"
            :props="props"
          >
            {{ props.row.name }}
          </q-td>
          <q-td
            key="surname"
            :props="props"
          >
            {{ props.row.surname }}
          </q-td>
          <q-td
            key="phone"
            :props="props">
            {{ props.row.phone }}
            <q-popup-edit
              v-model="props.row.phone"
              title="Update phone"
              buttons
              persistent
            >
              <q-input
                v-model="props.row.phone"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
          <q-td
            key="job"
            :props="props">
            {{ props.row.job }}
            <q-popup-edit
              v-model="props.row.job"
              title="Update job"
              buttons
              persistent>
              <q-input
                v-model="props.row.job"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
          <q-td
            key="department"
            :props="props">
            {{ props.row.department }}
            <q-popup-edit
              v-model="props.row.department"
              title="Update department"
              buttons
              persistent>
              <q-input
                v-model="props.row.department"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
          <q-td
            key="position"
            :props="props">
            {{ props.row.position }}
            <q-popup-edit
              v-model="props.row.position"
              title="Update position"
              buttons
              persistent>
              <q-input v-model="props.row.position" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
        <q-td
          key="actions"
          auto-width
          :props="props"
        >
          <q-btn
            class="q-mr-sm"
            color="green"
            icon="save"
            @click="saveChanges(props.row)"
          >
            <q-tooltip>Edit person information from database</q-tooltip>
          </q-btn>
          <q-btn
            color="red"
            icon="delete"
            @click="deletePerson(props.row.id)"
          >
            <q-tooltip>Delete person from database</q-tooltip>
          </q-btn>
        </q-td>
        </q-tr>
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
          label: 'Phone (editable)',
          align: 'left',
          field: (row) => row.phone,
        },
        {
          name: 'job',
          label: 'Job (editable)',
          align: 'left',
          field: (row) => row.job,
        },
        {
          name: 'department',
          label: 'Department (editable)',
          align: 'left',
          field: (row) => row.department,
        },
        {
          name: 'position',
          label: 'Position (editable)',
          align: 'left',
          field: (row) => row.position,
        },
        {
          name: 'actions',
          label: 'Actions',
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
      this.$api.remove('/api/remove', id)
        .then(() => {
          this.notify('Success');
        })
        .finally(() => {
          this.getData();
        });
    },
    saveChanges(obj) {
      const data = new FormData();
      Object.keys(obj).forEach((key) => {
        data.append(key, obj[key]);
      });
      this.$api.put('/api/update', obj.id, data)
        .then(() => {
          this.notify('Success');
        })
        .finally(() => {
          this.getData();
        });
    },
    notify(message) {
      Notify.create({
        message,
        icon: 'thumb_up',
        color: 'positive',
        position: 'bottom-right',
      });
    },
  },
};
</script>

<style scoped lang="stylus">
  /deep/.q-table th:first-child
    min-width 140px
</style>
