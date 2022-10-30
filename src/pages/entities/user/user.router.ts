import { useRouter } from 'vue-router';
import { UserRouteName } from './user.enum';

export default () => {
  const router = useRouter();

  const goToUserList = async () => {
    await router.push({
      name: UserRouteName.LIST,
    });
  };

  const goToUserCreate = async () => {
    await router.push({
      name: UserRouteName.CREATE,
    });
  };

  const goToUserUpdate = async (id: string) => {
    await router.push({
      name: UserRouteName.UPDATE,
      params: { id },
    });
  };

  const goToUserDetail = async (id: string) => {
    await router.push({
      name: UserRouteName.DETAIL,
      params: { id },
    });
  };

  return {
    goToUserList,
    goToUserCreate,
    goToUserUpdate,
    goToUserDetail,
  };
};
