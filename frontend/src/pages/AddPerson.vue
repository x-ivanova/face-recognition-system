<template>
  <div class="q-pa-sm">
    <div class="text-h5 q-pa-sm">Add person</div>
    <div
      class="q-gutter-md"
      style="max-width: 300px"
    >
    <q-input
      filled
      v-model="name"
      label="Name"
      hint="Required field"
      :rules="[ val => val.length > 0 || 'Required field']"
    />
    <q-input
      filled
      v-model="surname"
      label="Surname"
      hint="Required field"
      :rules="[ val => val.length > 0 || 'Required field']"
    />
    <q-file
      filled
      v-model="photo"
      label="Photo"
      class="ellipsis"
      counter
      accept=".jpg, image/*"
      hint="Required field"
      style="max-width: 285px"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <q-btn
      color="primary"
      label="Add person"
      :disable="!isEnable()"
      @click="addPerson()"
    />
    </div>
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
