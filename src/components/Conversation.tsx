import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import MessageComponent from './Message';

interface Message {
  id: string;
  content: string;
  role: string;
}

interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
}

export default function Conversation({ conversationid }: { conversationid?: string }) {
  const [message, setMessage] = React.useState('');
  const router = useRouter();

  const [conversation, setConversation] = useState<Conversation>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { token } = useContext(UserContext);

  useEffect(() => {    
    if (conversationid == null) {
      setIsLoading(false);
      return; 
    }

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token) {
      myHeaders.append('Authorization', 'Bearer ' + token);
    }

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(
      `http://localhost:3000/api/conversations/${conversationid}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Quelque chose s\'est mal passé');
        }
        return response.json()
      })
      .then((result) => setConversation(result))
      .catch((error) => setError(error.message))
    setIsLoading(false);
  }, [conversationid, token]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message === '') return;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (token) {
      myHeaders.append('Authorization', 'Bearer ' + token);
    }

    var raw = JSON.stringify({
      content: message,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    if (conversation?.id) {
      fetch(
        `http://localhost:3000/api/conversations/${conversation?.id}/sendMessage`,
        requestOptions
      )
        .then((reponse) => {
          if (!reponse.ok) {
            throw Error("Erreur dans l'envoie");
          }
          return reponse.json();
        })
        .then((result) => setConversation({
          ...conversation,
          messages: [
            ...conversation.messages,
            result.messages[0],
            result.messages[1]
          ]
        }))
        .catch((error) => setError(error.message));
    } else {
      fetch('http://localhost:3000/api/conversations', requestOptions)
        .then((reponse) => {
          if (!reponse.ok) {
            throw Error("Erreur dans l'envoie");
          }
          return reponse.json();
        })
        .then((result) => {
          router.push('/conversations/' + result?.id);
        })
        .catch((error) => setError(error.message));
    }
    console.log(conversation);
    setMessage('');
  };
  
  return (
    <main className="flex flex-col h-full w-full bg-gray-200 dark:bg-gray-800">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isLoading && !error && (
      <div className="flex-1 overflow-y-auto">
        {conversation?.messages &&
          conversation?.messages?.map((message) => (
            <MessageComponent
              key={message?.id}
              message={message?.content}
              role={message?.role}
            />
          ))}
      </div>
      )}
      <form className="flex w-full p-4" onSubmit={handleSubmit}>
        <input
          className="w-full h-12 px-4 md:px-6 text-sm md:text-base bg-gray-100 dark:bg-gray-900 border border-transparent dark:border-white/20 md:dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-white/20 dark:focus:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="ml-4 px-4 py-2 text-sm md:text-base bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500 disabled:hover:bg-blue-500"
          type="submit"
        >
          Send
        </button>
      </form>
    </main>
  );
}
