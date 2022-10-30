<template>
  <q-page padding>
    <h4 class="q-ma-none">{{ getPageTitle }}</h4>
    <q-separator class="q-my-md" />
    <q-form>
      <div class="row q-col-gutter-x-xl">
        <div class="col-xs-12 col-md-4 q-gutter-y-md">
          <p class="text-h6">{{ $t('user.title.detail') }}</p>
          <q-input filled v-model="user.id" :label="$t('user.id')" />
          <q-input filled v-model="user.name" :label="$t('user.name')" />
          <q-input filled v-model="user.phone" :label="$t('user.username')" />
          <q-input filled v-model="user.email" :label="$t('user.email')" />
          <q-input filled v-model="user.phone" :label="$t('user.phone')" />
          <q-input filled v-model="user.phone" :label="$t('user.website')" />
        </div>

        <div class="col-12 q-mt-md">
          <q-btn :label="$t('global.action.save')" color="positive" type="button" unelevated @click="formSubmit()" />
          <q-btn :label="$t('global.action.cancel')" color="primary" type="reset" class="q-ml-md" flat unelevated @click="goToUserList()" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
  import { IUser } from 'src/shared/model';
  import { notifySuccess } from 'src/shared/notify';
  import { computed, defineComponent, onBeforeMount, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  import userRouter from './user.router';
  import { UserService } from './UserService';

  const initialState = (): IUser => ({ id: '', name: '', username:'', email: '', phone: '', website: '' });

  export default defineComponent({
    name: 'UserUpdate',

    setup() {
      const { goToUserList } = userRouter();

      const route = useRoute();
      const haveId = route.params.id as string;
      const user = ref<IUser>(initialState());

      const { t } = useI18n();

      const getPageTitle = computed(() => (haveId ? t('user.title.edit') : t('user.title.create')));

      const formSubmit = async () => {
        if (haveId) {
          await new UserService().update(user.value);
          notifySuccess(t('user.message.updated'));
        } else {
          await new UserService().create(user.value);
          notifySuccess(t('user.message.created'));
        }
        await goToUserList();
      };

      onBeforeMount(async () => {
        if (haveId) {
          user.value = await new UserService().getById(haveId);
        }
      });

      return {
        user,
        getPageTitle,
        goToUserList,
        formSubmit,
      };
    },
  });
</script>
