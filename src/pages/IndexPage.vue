<template>
  <q-page class="row items-center justify-evenly">
    <q-btn color="primary" size="xl" icon="people_alt" :label="$t('user.title.list')" @click="goToUserList()">
      <q-tooltip>{{ $t('user.title.list') }}</q-tooltip>
    </q-btn>
  </q-page>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import userRouter from './entities/user/user.router';

  export default defineComponent({
    name: 'IndexPage',

    setup() {
      const { goToUserList } = userRouter();

      return { goToUserList };
    },
  });
</script>
