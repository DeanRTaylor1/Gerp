/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export function handleApiError(
  error: unknown,
  showToast: (message: string, type?: string) => void,
  translator: { [key: string]: any }
) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      showToast(error.response.data.message);
    }
  } else {
    showToast(translator.global.something_went_wrong);
  }
}
