# Vapi.ai Integration Guide

## Overview

recepce.tech now includes advanced Vapi.ai integration for AI-powered voice calls. The landing page features interactive components that respond to user interactions and call states.

## Features

### 1. DotGrid Background
- **Location:** `client/src/components/DotGrid.tsx`
- **Behavior:** Animated dot grid that responds to mouse proximity with shockwave effects
- **Settings:**
  - `dotSize`: 2px
  - `gap`: 25px spacing between dots
  - `baseColor`: #1e293b (slate gray)
  - `activeColor`: #22d3ee (cyan neon)
  - `shockRadius`: 200px (radius of mouse influence)
  - `shockStrength`: 5-15 (varies based on call state)

### 2. Variable Font Typography
- **Location:** `client/src/components/VariableFont.tsx`
- **Behavior:** Font weight responds to mouse distance from the element
- **Range:** wght 300 (far) to wght 900 (near)
- **Usage:** Applied to the "Recepce.tech" heading for dynamic, responsive typography

### 3. Vapi Call Integration
- **Location:** `client/src/hooks/useVapiCall.ts`
- **Features:**
  - Call state management (active/inactive)
  - Speech detection (speaking/listening)
  - Event callbacks for call lifecycle
  - Error handling

## Setup Instructions

### 1. Obtain Vapi API Key
1. Visit [Vapi.ai](https://vapi.ai)
2. Sign up and create an account
3. Navigate to API Keys section
4. Generate a new API key

### 2. Configure Environment Variable
Add your Vapi API key and assistant ID to the project:

```bash
# In the Management UI Settings → Secrets
# Add a new secret:
VITE_VAPI_API_KEY=your_api_key_here
VITE_VAPI_ASSISTANT_ID=your_assistant_id_here
```

### 3. Test the Integration
1. Start the dev server: `pnpm dev`
2. Click the central voice button to initiate a call
3. Observe:
   - Button changes from cyan to red
   - Status badge updates to "Call Active"
   - Orbital rings change to red
   - DotGrid shockwave intensity increases
   - Variable font responds to mouse movement

## Component API

### DotGrid Props
```typescript
interface DotGridProps {
  dotSize?: number;           // Size of each dot (default: 2)
  gap?: number;               // Spacing between dots (default: 25)
  baseColor?: string;         // Color when inactive (default: #1e293b)
  activeColor?: string;       // Color when active (default: #22d3ee)
  shockRadius?: number;       // Radius of mouse influence (default: 200)
  shockStrength?: number;     // Intensity of shockwave (default: 5)
}
```

### VariableFont Props
```typescript
interface VariableFontProps {
  children: React.ReactNode;
  className?: string;
  minWeight?: number;         // Minimum font weight (default: 300)
  maxWeight?: number;         // Maximum font weight (default: 900)
  minDistance?: number;       // Distance at max weight (default: 0)
  maxDistance?: number;       // Distance at min weight (default: 500)
}
```

### useVapiCall Hook
```typescript
const {
  isCallActive,              // Boolean: is a call currently active
  isSpeaking,               // Boolean: is the AI currently speaking
  isLoading,                // Boolean: is call initializing
  startCall,                // Function: initiate a call
  stopCall,                 // Function: end the current call
  vapiInstance,             // Vapi instance reference
} = useVapiCall({
  apiKey: 'your_api_key',
  assistantId: 'your_assistant_id',
  onCallStart: () => {},
  onCallEnd: () => {},
  onSpeechStart: () => {},
  onSpeechEnd: () => {},
  onError: (error) => {},
});
```

## Visual Feedback States

### Idle State (No Call)
- Button: Cyan gradient
- Status Badge: "System Online" (green dot)
- Orbital Rings: Cyan color
- DotGrid Shockwave: Normal intensity (5)

### Call Active (Listening)
- Button: Red gradient with call-pulse animation
- Status Badge: "Call Active" (red dot)
- Orbital Rings: Red color
- DotGrid Shockwave: Increased intensity (10)
- Text: "Naslouchám..." (Listening...)

### Speech Active (AI Speaking)
- Button: Red gradient with enhanced pulse
- Orbital Rings: Red color with increased animation
- DotGrid Shockwave: Maximum intensity (15)
- Text: "Mluvím..." (Speaking...)
- Speech wave animations around button

## Performance Considerations

1. **Canvas Rendering:** The DotGrid uses requestAnimationFrame for smooth 60fps animation
2. **Mouse Events:** Debounced to prevent excessive calculations
3. **Memory:** Dot positions are cached to minimize allocations
4. **Responsive:** Grid recalculates on window resize

## Troubleshooting

### DotGrid not showing
- Check z-index: should be 0 (behind content)
- Verify canvas is rendering: open DevTools → Elements → look for `<canvas>`

### Variable font not responding
- Ensure font supports variable weights (Geist/Inter do)
- Check font-variation-settings in DevTools

### Vapi calls not working
- Verify API key is set in environment variables
- Check browser console for errors
- Ensure microphone permissions are granted
- Test with Vapi's official demo first

## Future Enhancements

1. **Assistant Selection:** Allow users to choose different AI assistants
2. **Call Recording:** Option to record and transcribe calls
3. **Analytics:** Track call duration, success rate, user feedback
4. **Custom Voices:** Support for different voice profiles
5. **Multi-language:** Support for different languages and accents
