<template>
  <div class="text-center q-ma-lg">
    <q-icon name="visibility_off" color="indigo-2" size="xl" />
    <p class="text-indigo-3" v-if="message">{{ message }}</p>
    <p class="text-indigo-3" v-else>Nenhum dado no momento</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'DataNotFound',

    props: {
      message: {
        type: String,
        required: false,
      },
    },
  });
</script>
