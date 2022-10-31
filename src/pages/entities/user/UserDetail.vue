<template>
  <q-page padding>
    <h4 class="q-ma-none">{{ $t('user.title.detail') }}</h4>
    <q-separator class="q-my-md" />

    <div class="app-details" v-if="user">
      <div class="row q-col-gutter-x-xl">
        <div class="col-xs-12 col-md-4 q-gutter-y-md">
          <p class="text-h6">{{ $t('user.title.detail') }}</p>
          <q-input readonly outlined v-model="user.id" :label="$t('user.id')" />
          <q-input readonly outlined v-model="user.name" :label="$t('user.name')" />
          <q-input readonly outlined v-model="user.username" :label="$t('user.username')" />
          <q-input readonly outlined v-model="user.email" :label="$t('user.email')" />
          <q-input readonly outlined v-model="user.phone" :label="$t('user.phone')" />
          <q-input readonly outlined v-model="user.website" :label="$t('user.website')" />
        </div>
        <div class="col-12 q-mt-md">
          <q-btn :label="$t('global.action.edit')" color="info" type="button" unelevated @click="goToUserUpdate(user.id)" />
          <q-btn :label="$t('global.action.back')" color="primary" type="reset" flat class="q-ml-md" @click="goToUserList()" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
  import { IUser } from 'src/shared/model';
  import { defineComponent, onBeforeMount, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import userRouter from './user.router';
  import { UserService } from './UserService';

  export default defineComponent({
    name: 'UserDetail',

    setup() {
      const { goToUserList, goToUserUpdate } = userRouter();

      const route = useRoute();
      const id = route.params.id as string;
      const user = ref<IUser>();

      const getUserData = async () => {
        user.value = await new UserService().getById(id);
      };

      onBeforeMount(async () => {
        await getUserData();
      });

      return {
        user,
        goToUserList,
        goToUserUpdate,
      };
    },
  });
</script>
