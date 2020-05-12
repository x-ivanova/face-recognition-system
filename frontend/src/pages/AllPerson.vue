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
            >
            <q-tooltip>Delete person from database</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
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
          field: (row) => row.photo,
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
      data: [
        {
          name: 'Natasha',
          surname: 'Ivanova',
          photo: 'https://sun9-20.userapi.com/c852228/v852228414/152542/5FBUDQaGM6E.jpg',
          phone: '+7 999 121 59 01',
          job: 'STM labs',
          position: 'Junior frontend',
          department: 'MTS DataCrawler',
        },
        {
          name: 'Alex',
          surname: 'Lyashuk',
          photo: 'https://sun9-28.userapi.com/Iv7KIbJ0Sg-3QYfFOMrlvaWXDgMPchukHgw6Zw/NONl8XtJicI.jpg',
          phone: '+7 999 121 75 00',
          job: 'Xperience.ai',
          position: 'Sexy man',
          department: 'Occipital',
        },
      ],
    };
  },
};
</script>

<style scoped lang="stylus">
  /deep/.q-table th:first-child
    min-width 140px
</style>
