import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Leftbar from '@/components/Leftbar';
import ConversationComponent from '@/components/Conversation';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

export default function ConversationId() {
  const router = useRouter();

  const conversationid = router.query.conversationid;

  return (
    <>
      <Leftbar conversationId={conversationid as string} />
      <ConversationComponent conversationid={conversationid as string} />
    </>
  );
}
