import { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';

interface UseVapiCallOptions {
  apiKey?: string;
  assistantId?: string;
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onError?: (error: Error) => void;
}

export const useVapiCall = (options: UseVapiCallOptions = {}) => {
  const vapiRef = useRef<InstanceType<typeof Vapi> | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize Vapi only if API key is provided
    if (!options.apiKey) return;

    try {
      vapiRef.current = new Vapi(options.apiKey);

      // Set up event listeners
      vapiRef.current.on('call-start', () => {
        setIsCallActive(true);
        options.onCallStart?.();
      });

      vapiRef.current.on('call-end', () => {
        setIsCallActive(false);
        setIsSpeaking(false);
        options.onCallEnd?.();
      });

      vapiRef.current.on('speech-start', () => {
        setIsSpeaking(true);
        options.onSpeechStart?.();
      });

      vapiRef.current.on('speech-end', () => {
        setIsSpeaking(false);
        options.onSpeechEnd?.();
      });

      vapiRef.current.on('error', (error: Error) => {
        console.error('Vapi error:', error);
        options.onError?.(error);
      });
    } catch (error) {
      console.error('Failed to initialize Vapi:', error);
      options.onError?.(error as Error);
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, [options.apiKey]);

  const startCall = async () => {
    if (!vapiRef.current) {
      console.error('Vapi not initialized');
      return;
    }

    if (!options.assistantId) {
      const error = new Error('Vapi assistant ID is missing');
      console.error(error.message);
      options.onError?.(error);
      return;
    }

    try {
      setIsLoading(true);
      await vapiRef.current.start(options.assistantId);
    } catch (error) {
      console.error('Failed to start call:', error);
      options.onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCall = async () => {
    if (!vapiRef.current) return;

    try {
      await vapiRef.current.stop();
    } catch (error) {
      console.error('Failed to stop call:', error);
      options.onError?.(error as Error);
    }
  };

  return {
    isCallActive,
    isSpeaking,
    isLoading,
    startCall,
    stopCall,
    vapiInstance: vapiRef.current,
  };
};
