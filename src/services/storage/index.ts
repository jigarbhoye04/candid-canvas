import {
  VERCEL_BLOB_BASE_URL,
  vercelBlobCopy,
  vercelBlobDelete,
  vercelBlobList,
  vercelBlobPut,
  vercelBlobUploadFromClient,
} from './vercel-blob';
import { generateNanoid } from '@/utility/nanoid';

export const generateStorageId = () => generateNanoid(16);

export type StorageListResponse = {
  url: string;
  uploadedAt?: Date;
}[];

export const labelForStorage = (): string => 'Vercel Blob';

export const baseUrlForStorage = () => VERCEL_BLOB_BASE_URL;

const PREFIX_UPLOAD = 'upload';
const PREFIX_PHOTO = 'photo';

export const generateRandomFileNameForPhoto = () =>
  `${PREFIX_PHOTO}-${generateStorageId()}`;

const REGEX_UPLOAD_ID = new RegExp(
  `.${PREFIX_UPLOAD}-([a-z0-9]+)\\.[a-z]{1,4}$`,
  'i',
);

export const fileNameForStorageUrl = (url: string) =>
  url.replace(`${VERCEL_BLOB_BASE_URL}/`, '');

export const getExtensionFromStorageUrl = (url: string) =>
  url.match(/.([a-z]{1,4})$/i)?.[1];

export const getIdFromStorageUrl = (url: string) =>
  url.match(REGEX_UPLOAD_ID)?.[1];

export const uploadPhotoFromClient = async (
  file: File | Blob,
  extension = 'jpg',
) => vercelBlobUploadFromClient(file, `${PREFIX_UPLOAD}.${extension}`);

export const putFile = (file: Buffer, fileName: string) => {
  return vercelBlobPut(file, fileName);
};

export const copyFile = (
  originUrl: string,
  destinationFileName: string,
): Promise<string> => {
  return vercelBlobCopy(originUrl, destinationFileName, false);
};

export const deleteFile = (url: string) => {
  return vercelBlobDelete(url);
};

export const moveFile = async (
  originUrl: string,
  destinationFileName: string,
) => {
  const url = await copyFile(originUrl, destinationFileName);
  if (url) {
    await deleteFile(originUrl);
  }
  return url;
};

const getStorageUrlsForPrefix = async (prefix = '') => {
  const urls: StorageListResponse = [];

  urls.push(...(await vercelBlobList(prefix).catch(() => [])));

  return urls.sort((a, b) => {
    if (!a.uploadedAt) {
      return 1;
    }
    if (!b.uploadedAt) {
      return -1;
    }
    return b.uploadedAt.getTime() - a.uploadedAt.getTime();
  });
};

export const getStorageUploadUrls = () =>
  getStorageUrlsForPrefix(`${PREFIX_UPLOAD}-`);

export const getStoragePhotoUrls = () =>
  getStorageUrlsForPrefix(`${PREFIX_PHOTO}-`);

export const testStorageConnection = () => getStorageUrlsForPrefix();
