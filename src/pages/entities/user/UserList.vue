<template>
  <q-page padding>
    <div class="row justify-between">
      <div class="col-auto">
        <h4 class="q-ma-none">{{ $t('user.title.list') }}</h4>
      </div>
      <div class="col-auto">
        <div class="flex flex-md">
          <q-btn class="q-mr-md" flat round icon="sync" @click="getAllUsers">
            <q-tooltip>{{ $t('global.action.update') }}</q-tooltip>
          </q-btn>

          <q-input class="q-mr-md" filled dense debounce="300" v-model="filter" :placeholder="$t('user.action.search')">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn color="primary" @click="goToUserCreate">{{ $t('user.action.create') }}</q-btn>
        </div>
      </div>
    </div>

    <q-separator class="q-my-md" />

    <DataNotFound v-if="users && users.length === 0" :message="$t('user.message.notFound')" />

    <div v-if="users && users.length > 0">
      <q-table :rows="users" :columns="columns" :rows-per-page-options="rowsPerPage" row-key="name" :filter="filter">
        <template #body="props">
          <q-tr>
            <q-td key="" :props="props">
              <q-btn flat round size="sm" color="info" icon="visibility" @click="goToUserDetail(props.row.id)">
                <q-tooltip class="bg-info">{{ $t('global.action.view') }}</q-tooltip>
              </q-btn>
              <q-btn flat round size="sm" color="primary" icon="create" @click="goToUserUpdate(props.row.id)">
                <q-tooltip class="bg-primary">{{ $t('global.action.edit') }}</q-tooltip>
              </q-btn>
              <q-btn flat round size="sm" color="negative" icon="delete" @click="openDialog(props.row.id, props.row.name)">
                <q-tooltip class="bg-negative">{{ $t('global.action.delete') }}</q-tooltip>
              </q-btn>
            </q-td>

            <q-td v-for="row in rows" :key="row" :props="props">{{ props.row[row] }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>

  <q-dialog v-model="dialog" v-if="dialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ $t('global.action.delete') }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p>{{ $t('user.message.delete') }}</p>
        <strong>{{ deleteName }}</strong>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :label="$t('global.action.delete')" color="negative" @click="deleteEntity" />
        <q-btn :label="$t('global.action.cancel')" color="primary" @click="dialog = false" flat />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
  import DataNotFound from 'src/shared/data-not-found/DataNotFound.vue';
  import { IUser } from 'src/shared/model';
  import { notifySuccess } from 'src/shared/notify';
  import { defineComponent, onBeforeMount, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import userRouter from './user.router';
  import { UserService } from './UserService';

  export default defineComponent({
    name: 'UserList',

    components: { DataNotFound },

    data() {
      return {
        rowsPerPage: [20, 50, 100, 0],
        filter: '',
      };
    },

    setup() {
      const users = ref<IUser[]>([]);
      let dialog = ref(false);
      let deleteId = ref('');
      let deleteName = ref('');
      const { t } = useI18n();

      const header = [t('user.id'), t('user.name'), t('user.username'), t('user.email'), t('user.phone'), t('user.website')];
      const rows = ['id', 'name', 'email', 'username', 'phone', 'website'];
      const columns = [
        { align: 'left', sortable: false, name: '', field: '', label: t('global.action.actions') },
        { align: 'left', sortable: true, name: rows[0], field: rows[0], label: header[0] },
        { align: 'left', sortable: true, name: rows[1], field: rows[1], label: header[1] },
        { align: 'left', sortable: true, name: rows[2], field: rows[2], label: header[2] },
        { align: 'left', sortable: true, name: rows[3], field: rows[3], label: header[3] },
        { align: 'left', sortable: true, name: rows[4], field: rows[4], label: header[4] },
        { align: 'left', sortable: true, name: rows[5], field: rows[5], label: header[5] },
      ];

      const { goToUserList, goToUserCreate, goToUserUpdate, goToUserDetail } = userRouter();

      const deleteUser = async (id: string) => new UserService().delete(id);

      const getAllUsers = async () => (users.value = await new UserService().getAll());

      onBeforeMount(async () => {
        await getAllUsers();
      });

      const openDialog = (id: string, name: string) => {
        deleteId.value = id;
        deleteName.value = name;
        dialog.value = true;
      };

      const deleteEntity = async () => {
        await deleteUser(deleteId.value);
        notifySuccess(t('user.message.deleted'));
        await getAllUsers();
        dialog.value = false;
      };

      return {
        users,
        dialog,
        deleteName,

        getAllUsers,
        openDialog,
        deleteEntity,

        goToUserList,
        goToUserCreate,
        goToUserUpdate,
        goToUserDetail,
        rows,
        columns,
      };
    },
  });
</script>
