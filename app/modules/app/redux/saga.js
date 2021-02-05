import userSaga from '../user/redux/saga';
import entrySaga from '../entry/redux/saga';

export default function* appSaga() {
  yield []
    .concat(entrySaga)
    .concat(userSaga);
}
