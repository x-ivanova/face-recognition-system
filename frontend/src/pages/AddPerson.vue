<template>
  <div class="q-pa-sm">
    <div class="text-h5 q-pa-sm">Add person</div>
    <div class="row q-mb-sm">
      <q-input
        filled
        v-model="name"
        label="Name"
        class="q-pa-sm"
        style="width: 300px"
        hint="Required field"
        :rules="[ val => val.length > 0 || 'Required field']"
      />
      <q-input
        filled
        v-model="surname"
        label="Surname"
        class="q-pa-sm"
        style="width: 300px"
        hint="Required field"
        :rules="[ val => val.length > 0 || 'Required field']"
      />
    </div>
    <q-file
      filled
      v-model="photo"
      label="Photo"
      class="ellipsis q-pa-sm"
      counter
      accept=".jpg, image/*"
      hint="Required field"
      style="max-width: 600px"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <div class="row q-mb-sm">
      <q-input
        filled
        v-model="phone"
        label="Phone"
        class="q-pa-sm"
        style="width: 300px"
      >
        <template v-slot:prepend>
          <q-icon name="phone" />
        </template>
      </q-input>
      <q-input
        filled
        v-model="job"
        label="Job"
        class="q-pa-sm"
        style="width: 300px"
      >
        <template v-slot:prepend>
          <q-icon name="work" />
        </template>
      </q-input>
    </div>
    <div class="row q-mb-sm">
      <q-input
        filled
        v-model="department"
        label="Department"
        class="q-pa-sm"
        style="width: 300px"
      >
        <template v-slot:prepend>
          <q-icon name="device_hub" />
        </template>
      </q-input>
      <q-input
        filled
        v-model="position"
        label="Position"
        class="q-pa-sm"
        style="width: 300px"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
    </div>
    <q-btn
      color="primary"
      class="q-ml-sm"
      label="Add person"
      :disable="!isEnable()"
      @click="addPerson()"
    />
    </div>
</template>

<script>
import { Notify } from 'quasar';

export default {
  name: 'AddPerson',
  data() {
    return {
      name: '',
      surname: '',
      photo: null,
      phone: '',
      job: '',
      department: '',
      position: '',
    };
  },
  methods: {
    addPerson() {
      const uploadData = new FormData();
      uploadData.append('name', this.name);
      uploadData.append('surname', this.surname);
      uploadData.append('file', this.photo);
      this.$api.post('/add', uploadData)
        .then(() => {
          Notify.create({
            message: 'Success',
            icon: 'thumb_up',
            color: 'positive',
            position: 'bottom-right',
          });
        })
        .catch(() => {

        });
    },
    isEnable() {
      return !!this.name && !!this.surname && !!this.photo;
    },
  },
};
</script>

<style scoped>

</style>
