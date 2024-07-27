// export const apiUrl = "https://chat-backend.cyclic.app";
export const apiUrl = "https://75f9-111-88-157-158.in.ngrok.io";
export const imageUrl = `${apiUrl}/api/images/`;
export const socketURL = `${apiUrl}`;

export const BaseURL = (link) => {
  return `${apiUrl}/api/${link}`;
};

export const googleMapApiKey = "AIzaSyApxCvmhANL6M1WJ6zvnc3A4HjiY6pSHDI";

export const apiHeader = (token, isFormData) => {
  if (token && !isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  }
  if (token && isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  }
  if (!token && !isFormData) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (!token && isFormData) {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  }
};

export const CreateFormData = (data) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};
