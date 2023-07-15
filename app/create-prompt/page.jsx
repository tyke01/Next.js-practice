"use client";

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();


  const [submitting, setsubmitting] = useState(false)
  const [post, setpost] = useState({
    prompt: '',
    tag: '',
  });

  const CreatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        })
      });
      if(response.ok){
        router.push('/')

      }
    } 

    catch (error) {
      // Handle the error
      console.log(error);

    }

    finally{
      setsubmitting(false);
    }
  };

  // const { session } = useSession();
  // const router = useRouter();

  return (
    <Form
      type="create"
      post={post}
      setpost={setpost}
      submitting={submitting}
      handleSubmitting={CreatePrompt}
    />
  );
};

export default CreatePrompt;
