import { Storage } from '@tutoring/commons/utils';

import { LOCAL_STORAGE_PREFIX } from 'constants/common';

const storage = new Storage(LOCAL_STORAGE_PREFIX);

export default storage;
