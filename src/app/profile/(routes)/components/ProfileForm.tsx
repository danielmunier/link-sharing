"use client";

import React, { useState } from 'react';
import { InputSocial } from './InputSocial';

type ProfileFormData = {
  name: string;
  description: string;
};

type SocialMedia = {
  instagram: string;
  tiktok: string;
  twitter: string;
  youtube: string;
};


function ProfileForm({ sessionUserData }: { sessionUserData: any }) {

  const [status, setStatus] = useState<string | null>(null);
  const user = sessionUserData.user;

  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name,
    description: user?.description
  });


  const [formSocial, setFormSocial] = useState<SocialMedia>({
      instagram: user?.socialMedia.instagram || "",
      tiktok: user?.socialMedia.tiktok || "",
      twitter: user?.socialMedia.twitter || "",
      youtube: user?.socialMedia.youtube || "",
  })

const handleSocialChange = (e: {name: string; value: string}) => {
  const {name, value} = e
  setFormSocial({
    ...formSocial,
    [name]: value
  })
}
 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    // Incluindo as redes sociais
    for ( const key in formSocial ) {
      console.log(key)
      formDataToSend.append(key, formSocial[key]);
    }

    try {
      const response = await fetch(`/api/user/update/${sessionUserData.user.id}`, {
        method: "PUT",
        body: formDataToSend,
      });
      setStatus(await response.text());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      {status && <p className="text-gray-100 mb-4">{status}</p>}
      <div className="mb-4">
        <label htmlFor="username" className="block text-blue-500 text-sm font-bold mb-2">
          Nome de Usuário:
        </label>
        <input 
          type="text" 
          id="username" 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-blue-500 text-sm font-bold mb-2">
          Descrição:
        </label>
        <textarea 
          id="description" 
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
      {
        Object.entries(formSocial).map(([key, value]) => (
          <InputSocial key={key} socialMediaApp={key} value={value} onChange={handleSocialChange} />
        ))
      }
      </div>

      <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
        Salvar Alterações
      </button>
    </form>
  );
}

export default ProfileForm;
