"use client";

import React, { useState, useEffect } from 'react';
import { InputSocial } from './InputSocial';

type ProfileFormData = {
  username: string;
  description: string;
};


function ProfileForm({sessionUserData}: {sessionUserData: any}) {
  
  const user = sessionUserData.user

    const [formData, setFormData] = useState<ProfileFormData>({
      username: user?.name,
      description: user?.description,
    });


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('description', formData.description);
      try {
        const response = await fetch(`/api/user/${sessionUserData.user.id}`, {
          method: "PUT",
          body: formDataToSend,
        });
    
        // ...
      } catch (error) {
        // ...
      }
    };


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-3 bg-white rounded shadow-md ">
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          Nome de Usuário:
        </label>
        <input 
          type="text" 
          id="username" 
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Descrição:
        </label>
        <textarea 
          id="description" 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

<div className='grid grid-cols-2 gap-2 px-4'>
      {/* <InputSocial onChange={() => {}} socialMediaName={"Instagram"}/>
      <InputSocial onChange={() => {}} socialMediaName={"Discord"}/>
      <InputSocial onChange={() => {}} socialMediaName={"Github"}/>
      <InputSocial onChange={() => {}} socialMediaName={"Tiktok"}/> */}

</div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Salvar Alterações
      </button>
    </form>
  );
}

export default ProfileForm;
