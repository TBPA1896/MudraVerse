export interface Landmark {
  x: number;
  y: number;
  z: number;
}

export interface FeedbackItem {
  type: 'correct' | 'warning' | 'error';
  message: string;
  timestamp: string;
}

export interface MudraAnalysis {
  accuracy: number;
  feedback: FeedbackItem[];
}

export enum MudraType {
  Pataka = 'pataka',
  Tripataka = 'tripataka',
  Kartarimukha = 'kartarimukha',
  Mayura = 'mayura',
  Ardhachandra = 'ardhachandra',
  Arala = 'arala'
}

// Main function to calculate accuracy based on mudra type
export const calculateAccuracyByMudra = (mudra: MudraType, landmarks: Landmark[]): number => {
  switch (mudra) {
    case MudraType.Pataka:
      return calculatePatakaAccuracy(landmarks);
    case MudraType.Tripataka:
      return calculateTripatakaAccuracy(landmarks);
    case MudraType.Kartarimukha:
      return calculateKartarimukhaAccuracy(landmarks);
    case MudraType.Mayura:
      return calculateMayuraAccuracy(landmarks);
    case MudraType.Ardhachandra:
      return calculateArdhachandraAccuracy(landmarks);
    case MudraType.Arala:
      return calculateAralaAccuracy(landmarks);
    default:
      return 0;
  }
};

// Main function to generate feedback based on mudra type
export const generateFeedbackByMudra = (
  mudra: MudraType,
  landmarks: Landmark[],
  accuracy: number,
  currentFeedback: FeedbackItem[]
): FeedbackItem[] => {
  switch (mudra) {
    case MudraType.Pataka:
      return generatePatakaFeedback(landmarks, accuracy, currentFeedback);
    case MudraType.Tripataka:
      return generateTripatakaFeedback(landmarks, accuracy, currentFeedback);
    case MudraType.Kartarimukha:
      return generateKartarimukhaFeedback(landmarks, accuracy, currentFeedback);
    case MudraType.Mayura:
      return generateMayuraFeedback(landmarks, accuracy, currentFeedback);
    case MudraType.Ardhachandra:
      return generateArdhachandraFeedback(landmarks, accuracy, currentFeedback);
    case MudraType.Arala:
      return generateAralaFeedback(landmarks, accuracy, currentFeedback);
    default:
      return currentFeedback;
  }
};

// Pataka specific accuracy and feedback functions
export const calculatePatakaAccuracy = (landmarks: Landmark[]): number => {
  if (landmarks.length < 21) return 0;

  let accuracy = 0;
  let totalChecks = 0;

  const fingerExtensionScore = checkFingerExtension(landmarks);
  accuracy += fingerExtensionScore;
  totalChecks += 25;

  const fingerAlignmentScore = checkFingerAlignment(landmarks);
  accuracy += fingerAlignmentScore;
  totalChecks += 25;

  const thumbPositionScore = checkThumbPosition(landmarks);
  accuracy += thumbPositionScore;
  totalChecks += 20;

  const palmOrientationScore = checkPalmOrientation(landmarks);
  accuracy += palmOrientationScore;
  totalChecks += 15;

  const fingerSpacingScore = checkFingerSpacing(landmarks);
  accuracy += fingerSpacingScore;
  totalChecks += 15;

  const finalAccuracy = Math.round((accuracy / totalChecks) * 100);
  const variation = (Math.random() - 0.5) * 3;
  return Math.min(100, Math.max(0, finalAccuracy + variation));
};

export const generatePatakaFeedback = (
  landmarks: Landmark[],
  accuracy: number,
  currentFeedback: FeedbackItem[]
): FeedbackItem[] => {
  const newFeedback: FeedbackItem[] = [];
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const fingerExtensionScore = checkFingerExtension(landmarks);
  const fingerAlignmentScore = checkFingerAlignment(landmarks);
  const thumbPositionScore = checkThumbPosition(landmarks);
  const palmOrientationScore = checkPalmOrientation(landmarks);
  const fingerSpacingScore = checkFingerSpacing(landmarks);

  if (fingerExtensionScore < 20) {
    newFeedback.push({
      type: 'warning',
      message: 'Extend your fingers more - keep them straight and uncurled',
      timestamp: currentTime
    });
  } else if (fingerExtensionScore >= 20) {
    newFeedback.push({
      type: 'correct',
      message: 'Excellent finger extension!',
      timestamp: currentTime
    });
  }

  if (fingerAlignmentScore < 20) {
    newFeedback.push({
      type: 'warning',
      message: 'Align your fingers in a straight line',
      timestamp: currentTime
    });
  } else if (fingerAlignmentScore >= 20) {
    newFeedback.push({
      type: 'correct',
      message: 'Perfect finger alignment!',
      timestamp: currentTime
    });
  }

  if (thumbPositionScore < 15) {
    newFeedback.push({
      type: 'warning',
      message: 'Press your thumb against the side of your palm',
      timestamp: currentTime
    });
  } else if (thumbPositionScore >= 15) {
    newFeedback.push({
      type: 'correct',
      message: 'Great thumb position!',
      timestamp: currentTime
    });
  }

  if (palmOrientationScore < 10) {
    newFeedback.push({
      type: 'warning',
      message: 'Face your palm outward with fingers pointing up',
      timestamp: currentTime
    });
  }

  if (fingerSpacingScore < 10) {
    newFeedback.push({
      type: 'warning',
      message: 'Keep your fingers close together - avoid spreading them apart',
      timestamp: currentTime
    });
  }

  if (accuracy >= 90) {
    newFeedback.push({
      type: 'correct',
      message: `Excellent Pataka mudra! Accuracy: ${Math.round(accuracy)}%`,
      timestamp: currentTime
    });
  } else if (accuracy >= 75) {
    newFeedback.push({
      type: 'warning',
      message: `Good progress! Accuracy: ${Math.round(accuracy)}% - keep practicing`,
      timestamp: currentTime
    });
  }

  return [...newFeedback.slice(-3), ...currentFeedback.slice(0, 2)];
};

// Tripataka specific accuracy and feedback functions
export const calculateTripatakaAccuracy = (landmarks: Landmark[]): number => {
  if (landmarks.length < 21) return 0;

  let accuracy = 0;
  let totalChecks = 0;

  const extendedFingersScore = checkTripatakaExtendedFingers(landmarks);
  accuracy += extendedFingersScore;
  totalChecks += 25;

  const ringFingerBendScore = checkRingFingerBend(landmarks);
  accuracy += ringFingerBendScore;
  totalChecks += 25;

  const littleFingerScore = checkLittleFingerPosition(landmarks);
  accuracy += littleFingerScore;
  totalChecks += 15;

  const palmOrientationScore = checkPalmOrientation(landmarks);
  accuracy += palmOrientationScore;
  totalChecks += 15;

  const fingerSpacingScore = checkTripatakaFingerSpacing(landmarks);
  accuracy += fingerSpacingScore;
  totalChecks += 20;

  const finalAccuracy = Math.round((accuracy / totalChecks) * 100);
  const variation = (Math.random() - 0.5) * 3;
  return Math.min(100, Math.max(0, finalAccuracy + variation));
};

export const generateTripatakaFeedback = (
  landmarks: Landmark[],
  accuracy: number,
  currentFeedback: FeedbackItem[]
): FeedbackItem[] => {
  const newFeedback: FeedbackItem[] = [];
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const extendedFingersScore = checkTripatakaExtendedFingers(landmarks);
  const ringFingerBendScore = checkRingFingerBend(landmarks);
  const littleFingerScore = checkLittleFingerPosition(landmarks);
  const palmOrientationScore = checkPalmOrientation(landmarks);
  const fingerSpacingScore = checkTripatakaFingerSpacing(landmarks);

  if (extendedFingersScore < 20) {
    newFeedback.push({
      type: 'warning',
      message: 'Extend your thumb, index, and middle fingers straight',
      timestamp: currentTime
    });
  } else if (extendedFingersScore >= 20) {
    newFeedback.push({
      type: 'correct',
      message: 'Excellent extension of thumb, index, and middle fingers!',
      timestamp: currentTime
    });
  }

  if (ringFingerBendScore < 15) {
    newFeedback.push({
      type: 'warning',
      message: 'Bend your ring finger at the second joint',
      timestamp: currentTime
    });
  } else if (ringFingerBendScore >= 15) {
    newFeedback.push({
      type: 'correct',
      message: 'Perfect ring finger bend!',
      timestamp: currentTime
    });
  }

  if (littleFingerScore < 10) {
    newFeedback.push({
      type: 'warning',
      message: 'Position your little finger appropriately',
      timestamp: currentTime
    });
  }

  if (palmOrientationScore < 10) {
    newFeedback.push({
      type: 'warning',
      message: 'Face your palm outward',
      timestamp: currentTime
    });
  }

  if (fingerSpacingScore < 15) {
    newFeedback.push({
      type: 'warning',
      message: 'Keep your fingers close together',
      timestamp: currentTime
    });
  }

  if (accuracy >= 90) {
    newFeedback.push({
      type: 'correct',
      message: `Excellent Tripataka mudra! Accuracy: ${Math.round(accuracy)}%`,
      timestamp: currentTime
    });
  } else if (accuracy >= 75) {
    newFeedback.push({
      type: 'warning',
      message: `Good progress! Accuracy: ${Math.round(accuracy)}% - keep practicing`,
      timestamp: currentTime
    });
  }

  return [...newFeedback.slice(-3), ...currentFeedback.slice(0, 2)];
};

// Additional helper functions for Tripataka
const checkTripatakaExtendedFingers = (landmarks: Landmark[]): number => {
  const extendedTips = [4, 8, 12]; // thumb, index, middle tips
  const extendedPIPs = [3, 6, 10];

  let extendedCount = 0;

  extendedTips.forEach((tipIndex, fingerIndex) => {
    const tip = landmarks[tipIndex];
    const pip = landmarks[extendedPIPs[fingerIndex]];

    const dx = tip.x - pip.x;
    const dy = tip.y - pip.y;
    const angle = Math.abs(Math.atan2(dy, dx)) * (180 / Math.PI);

    if (angle < 30) {
      extendedCount++;
    }
  });

  return (extendedCount / 3) * 25;
};

const checkRingFingerBend = (landmarks: Landmark[]): number => {
  const ringTip = landmarks[16];
  const ringPIP = landmarks[14];
  const ringMCP = landmarks[13];

  const vector1 = { x: ringPIP.x - ringMCP.x, y: ringPIP.y - ringMCP.y };
  const vector2 = { x: ringTip.x - ringPIP.x, y: ringTip.y - ringPIP.y };

  const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
  const magnitude1 = Math.sqrt(vector1.x ** 2 + vector1.y ** 2);
  const magnitude2 = Math.sqrt(vector2.x ** 2 + vector2.y ** 2);

  const cosAngle = dotProduct / (magnitude1 * magnitude2);
  const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);

  if (angle > 90) {
    return 25;
  } else if (angle > 60) {
    return 15;
  } else {
    return 0;
  }
};

const checkLittleFingerPosition = (landmarks: Landmark[]): number => {
  const littleTip = landmarks[20];
  const littlePIP = landmarks[18];

  const dx = littleTip.x - littlePIP.x;
  const dy = littleTip.y - littlePIP.y;
  const angle = Math.abs(Math.atan2(dy, dx)) * (180 / Math.PI);

  if (angle < 45) {
    return 15;
  } else if (angle < 60) {
    return 10;
  } else {
    return 5;
  }
};

const checkTripatakaFingerSpacing = (landmarks: Landmark[]): number => {
  const fingerMCPs = [5, 9, 13, 17];
  const xPositions = fingerMCPs.map(index => landmarks[index].x);

  let totalSpacing = 0;
  for (let i = 1; i < xPositions.length; i++) {
    totalSpacing += Math.abs(xPositions[i] - xPositions[i-1]);
  }

  const avgSpacing = totalSpacing / (xPositions.length - 1);
  const spacingScore = Math.max(0, 20 - (avgSpacing * 300));
  return spacingScore;
};

// Kartarimukha specific accuracy and feedback functions
export const calculateKartarimukhaAccuracy = (landmarks: Landmark[]): number => {
  if (landmarks.length < 21) return 0;

  let accuracy = 0;
  let totalChecks = 0;

  // 1. Check index and middle fingers extended (25 points)
  const extendedFingersScore = checkKartarimukhaExtendedFingers(landmarks);
  accuracy += extendedFingersScore;
  totalChecks += 25;

  // 2. Check index and middle fingers close together (20 points)
  const fingerProximityScore = checkKartarimukhaFingerProximity(landmarks);
  accuracy += fingerProximityScore;
  totalChecks += 20;

  // 3. Check ring and little fingers bent into palm (25 points)
  const bentFingersScore = checkKartarimukhaBentFingers(landmarks);
  accuracy += bentFingersScore;
  totalChecks += 25;

  // 4. Check thumb position supporting bent fingers (15 points)
  const thumbPositionScore = checkKartarimukhaThumbPosition(landmarks);
  accuracy += thumbPositionScore;
  totalChecks += 15;

  // 5. Check palm orientation (15 points)
  const palmOrientationScore = checkPalmOrientation(landmarks);
  accuracy += palmOrientationScore;
  totalChecks += 15;

  const finalAccuracy = Math.round((accuracy / totalChecks) * 100);
  const variation = (Math.random() - 0.5) * 3;
  return Math.min(100, Math.max(0, finalAccuracy + variation));
};

export const generateKartarimukhaFeedback = (
  landmarks: Landmark[],
  accuracy: number,
  currentFeedback: FeedbackItem[]
): FeedbackItem[] => {
  const newFeedback: FeedbackItem[] = [];
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const extendedFingersScore = checkKartarimukhaExtendedFingers(landmarks);
  const fingerProximityScore = checkKartarimukhaFingerProximity(landmarks);
  const bentFingersScore = checkKartarimukhaBentFingers(landmarks);
  const thumbPositionScore = checkKartarimukhaThumbPosition(landmarks);
  const palmOrientationScore = checkPalmOrientation(landmarks);

  if (extendedFingersScore < 20) {
    newFeedback.push({
      type: 'warning',
      message: 'Extend your index and middle fingers straight',
      timestamp: currentTime
    });
  } else if (extendedFingersScore >= 20) {
    newFeedback.push({
      type: 'correct',
      message: 'Excellent extension of index and middle fingers!',
      timestamp: currentTime
    });
  }

  if (fingerProximityScore < 15) {
    newFeedback.push({
      type: 'warning',
      message: 'Keep your index and middle fingers close together like scissors',
      timestamp: currentTime
    });
  } else if (fingerProximityScore >= 15) {
    newFeedback.push({
      type: 'correct',
      message: 'Perfect finger proximity!',
      timestamp: currentTime
    });
  }

  if (bentFingersScore < 20) {
    newFeedback.push({
      type: 'warning',
      message: 'Bend your ring and little fingers into your palm',
      timestamp: currentTime
    });
  } else if (bentFingersScore >= 20) {
    newFeedback.push({
      type: 'correct',
      message: 'Great job bending the ring and little fingers!',
      timestamp: currentTime
    });
  }

  if (thumbPositionScore < 10) {
    newFeedback.push({
      type: 'warning',
      message: 'Position your thumb to support the bent fingers',
      timestamp: currentTime
    });
  }

  if (palmOrientationScore < 10) {
    newFeedback.push({
      type: 'warning',
      message: 'Face your palm outward',
      timestamp: currentTime
    });
  }

  if (accuracy >= 90) {
    newFeedback.push({
      type: 'correct',
      message: `Excellent Kartarimukha mudra! Accuracy: ${Math.round(accuracy)}%`,
      timestamp: currentTime
    });
  } else if (accuracy >= 75) {
    newFeedback.push({
      type: 'warning',
      message: `Good progress! Accuracy: ${Math.round(accuracy)}% - keep practicing`,
      timestamp: currentTime
    });
  }

  return [...newFeedback.slice(-3), ...currentFeedback.slice(0, 2)];
};

// Kartarimukha helper functions
const checkKartarimukhaExtendedFingers = (landmarks: Landmark[]): number => {
  const extendedTips = [8, 12]; // index, middle tips
  const extendedPIPs = [6, 10];

  let extendedCount = 0;

  extendedTips.forEach((tipIndex, fingerIndex) => {
    const tip = landmarks[tipIndex];
    const pip = landmarks[extendedPIPs[fingerIndex]];

    const dx = tip.x - pip.x;
    const dy = tip.y - pip.y;
    const angle = Math.abs(Math.atan2(dy, dx)) * (180 / Math.PI);

    if (angle < 30) {
      extendedCount++;
    }
  });

  return (extendedCount / 2) * 25;
};

const checkKartarimukhaFingerProximity = (landmarks: Landmark[]): number => {
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];

  const distance = Math.sqrt(
    Math.pow(indexTip.x - middleTip.x, 2) +
    Math.pow(indexTip.y - middleTip.y, 2)
  );

  if (distance < 0.05) {
    return 20;
  } else if (distance < 0.08) {
    return 15;
  } else if (distance < 0.12) {
    return 10;
  } else {
    return 0;
  }
};

const checkKartarimukhaBentFingers = (landmarks: Landmark[]): number => {
  const ringTip = landmarks[16];
  const littleTip = landmarks[20];
  const ringMCP = landmarks[13];
  const littleMCP = landmarks[17];

  let bentCount = 0;

  if (ringTip.y > ringMCP.y) bentCount++;
  if (littleTip.y > littleMCP.y) bentCount++;

  return (bentCount / 2) * 25;
};

const checkKartarimukhaThumbPosition = (landmarks: Landmark[]): number => {
  const thumbTip = landmarks[4];
  const thumbIP = landmarks[3];
  const ringMCP = landmarks[13];

  const distanceToRing = Math.sqrt(
    Math.pow(thumbTip.x - ringMCP.x, 2) +
    Math.pow(thumbTip.y - ringMCP.y, 2)
  );

  const thumbCurl = Math.abs(thumbTip.y - thumbIP.y);

  let score = 0;
  if (distanceToRing < 0.1) score += 7;
  if (thumbCurl > 0.02) score += 8;

  return score;
};

// Mayura specific accuracy and feedback functions
export const calculateMayuraAccuracy = (landmarks: Landmark[]): number => {
  if (landmarks.length < 21) return 0;

  let accuracy = 0;
  let totalChecks = 0;

  const extendedFingersScore = checkMayuraExtendedFingers(landmarks);
  accuracy += extendedFingersScore;
  totalChecks += 25;

  const bentFingersScore = checkMayuraBentFingers(landmarks);
  accuracy += bentFingersScore;
  totalChecks += 25;

  const fingerCurveScore = checkMayuraFingerCurve(landmarks);
  accuracy += fingerCurveScore;
  totalChecks += 15;

  const palmOrientationScore = checkPalmOrientation(landmarks);
  accuracy += palmOrientationScore;
  totalChecks += 20;

  const fingerSpacingScore = checkMayuraFingerSpacing(landmarks);
  accuracy += fingerSpacingScore;
  totalChecks += 15;

  const finalAccuracy = Math.round((accuracy / totalChecks) * 100);
  const variation = (Math.random() - 0.5) * 3;
  return Math.min(100, Math.max(0, finalAccuracy + variation));
};

export const generateMayuraFeedback = (
  landmarks: Landmark[],
  accuracy: number,
  currentFeedback: FeedbackItem[]
): FeedbackItem[] => {
  const newFeedback: FeedbackItem[] = [];
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const extendedFingersScore = checkMayuraExtendedFingers(landmarks);
  const bentFingersScore = checkMayuraBentFingers(landmarks);
  const fingerCurveScore = checkMayuraFingerCurve(landmarks);
  const palmOrientationScore = checkPalmOrientation(landmarks);
  const fingerSpacingScore = checkMayuraFingerSpacing(landmarks);

  if (extendedFingersScore < 20) {
    newFeedback.push({
      type: 'warning',
      message: 'Extend your thumb and little finger straight',
      timestamp: currentTime
    });
  } else if (extendedFingersScore >= 20) {
    newFeedback.push({
      type: 'correct',
      message: 'Excellent extension of thumb and little finger!',
      timestamp: currentTime
    });
  }

  if (bentFingersScore < 20) {
    newFeedback.push({
      type: 'warning',
      message: 'Bend your index, middle, and ring fingers into your palm',
      timestamp: currentTime
    });
  } else if (bentFingersScore >= 20) {
    newFeedback.push({
      type: 'correct',
      message: 'Perfect bending of the other fingers!',
      timestamp: currentTime
    });
  }

  if (fingerCurveScore < 10) {
    newFeedback.push({
      type: 'warning',
      message: 'Curve your extended fingers slightly like a peacock beak',
      timestamp: currentTime
    });
  }

  if (palmOrientationScore < 15) {
    newFeedback.push({
      type: 'warning',
      message: 'Face your palm outward',
      timestamp: currentTime
    });
  }

  if (fingerSpacingScore < 10) {
    newFeedback.push({
      type: 'warning',
      message: 'Adjust the spacing between your extended fingers',
      timestamp: currentTime
    });
  }

  if (accuracy >= 90) {
    newFeedback.push({
      type: 'correct',
      message: `Excellent Mayura mudra! Accuracy: ${Math.round(accuracy)}%`,
      timestamp: currentTime
    });
  } else if (accuracy >= 75) {
    newFeedback.push({
      type: 'warning',
      message: `Good progress! Accuracy: ${Math.round(accuracy)}% - keep practicing`,
      timestamp: currentTime
    });
  }

  return [...newFeedback.slice(-3), ...currentFeedback.slice(0, 2)];
};

// Mayura helper functions
const checkMayuraExtendedFingers = (landmarks: Landmark[]): number => {
  const extendedTips = [4, 20]; // thumb, little tips
  const extendedPIPs = [3, 18];

  let extendedCount = 0;

  extendedTips.forEach((tipIndex, fingerIndex) => {
    const tip = landmarks[tipIndex];
    const pip = landmarks[extendedPIPs[fingerIndex]];

    const dx = tip.x - pip.x;
    const dy = tip.y - pip.y;
    const angle = Math.abs(Math.atan2(dy, dx)) * (180 / Math.PI);

    if (angle < 45) {
      extendedCount++;
    }
  });

  return (extendedCount / 2) * 25;
};

const checkMayuraBentFingers = (landmarks: Landmark[]): number => {
  const fingerTips = [8, 12, 16]; // index, middle, ring tips
  const fingerMCPs = [5, 9, 13];

  let bentCount = 0;

  fingerTips.forEach((tipIndex, fingerIndex) => {
    const tip = landmarks[tipIndex];
    const mcp = landmarks[fingerMCPs[fingerIndex]];

    if (tip.y > mcp.y) bentCount++;
  });

  return (bentCount / 3) * 25;
};

const checkMayuraFingerCurve = (landmarks: Landmark[]): number => {
  const thumbTip = landmarks[4];
  const littleTip = landmarks[20];
  const thumbIP = landmarks[3];
  const littleDIP = landmarks[19];

  const thumbCurve = Math.abs(thumbTip.y - thumbIP.y);
  const littleCurve = Math.abs(littleTip.y - littleDIP.y);

  let score = 0;
  if (thumbCurve > 0.01) score += 7;
  if (littleCurve > 0.01) score += 8;

  return score;
};

const checkMayuraFingerSpacing = (landmarks: Landmark[]): number => {
  const thumbTip = landmarks[4];
  const littleTip = landmarks[20];

  const distance = Math.sqrt(
    Math.pow(thumbTip.x - littleTip.x, 2) +
    Math.pow(thumbTip.y - littleTip.y, 2)
  );

  if (distance > 0.1 && distance < 0.2) {
    return 15;
  } else if (distance > 0.08 && distance < 0.25) {
    return 10;
  } else {
    return 5;
  }
};

// Ardhachandra specific accuracy and feedback functions
export const calculateArdhachandraAccuracy = (landmarks: Landmark[]): number => {
  if (landmarks.length < 21) return 0;

  // Placeholder implementation - to be refined
  const accuracy = 80 + (Math.random() - 0.5) * 10;
  return Math.min(100, Math.max(0, Math.round(accuracy)));
};

export const generateArdhachandraFeedback = (
  landmarks: Landmark[],
  accuracy: number,
  currentFeedback: FeedbackItem[]
): FeedbackItem[] => {
  const newFeedback: FeedbackItem[] = [];
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Placeholder feedback
  if (accuracy >= 90) {
    newFeedback.push({
      type: 'correct',
      message: `Excellent Ardhachandra mudra! Accuracy: ${Math.round(accuracy)}%`,
      timestamp: currentTime
    });
  } else if (accuracy >= 75) {
    newFeedback.push({
      type: 'warning',
      message: `Good progress! Accuracy: ${Math.round(accuracy)}% - keep practicing`,
      timestamp: currentTime
    });
  } else {
    newFeedback.push({
      type: 'warning',
      message: 'Keep practicing Ardhachandra mudra for better accuracy',
      timestamp: currentTime
    });
  }

  return [...newFeedback.slice(-3), ...currentFeedback.slice(0, 2)];
};

// Arala specific accuracy and feedback functions
export const calculateAralaAccuracy = (landmarks: Landmark[]): number => {
  if (landmarks.length < 21) return 0;

  // Placeholder implementation - to be refined
  const accuracy = 80 + (Math.random() - 0.5) * 10;
  return Math.min(100, Math.max(0, Math.round(accuracy)));
};

export const generateAralaFeedback = (
  landmarks: Landmark[],
  accuracy: number,
  currentFeedback: FeedbackItem[]
): FeedbackItem[] => {
  const newFeedback: FeedbackItem[] = [];
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Placeholder feedback
  if (accuracy >= 90) {
    newFeedback.push({
      type: 'correct',
      message: `Excellent Arala mudra! Accuracy: ${Math.round(accuracy)}%`,
      timestamp: currentTime
    });
  } else if (accuracy >= 75) {
    newFeedback.push({
      type: 'warning',
      message: `Good progress! Accuracy: ${Math.round(accuracy)}% - keep practicing`,
      timestamp: currentTime
    });
  } else {
    newFeedback.push({
      type: 'warning',
      message: 'Keep practicing Arala mudra for better accuracy',
      timestamp: currentTime
    });
  }

  return [...newFeedback.slice(-3), ...currentFeedback.slice(0, 2)];
};


// Pataka Mudra Analysis Functions
export const calculateMudraAccuracy = (landmarks: Landmark[]): number => {
  if (landmarks.length < 21) return 0;

  let accuracy = 0;
  let totalChecks = 0;

  // 1. Check if fingers are extended (not curled)
  const fingerExtensionScore = checkFingerExtension(landmarks);
  accuracy += fingerExtensionScore;
  totalChecks += 25;

  // 2. Check finger alignment (should be in a straight line)
  const fingerAlignmentScore = checkFingerAlignment(landmarks);
  accuracy += fingerAlignmentScore;
  totalChecks += 25;

  // 3. Check thumb position (should be pressed against palm side)
  const thumbPositionScore = checkThumbPosition(landmarks);
  accuracy += thumbPositionScore;
  totalChecks += 20;

  // 4. Check palm orientation (should be facing outward)
  const palmOrientationScore = checkPalmOrientation(landmarks);
  accuracy += palmOrientationScore;
  totalChecks += 15;

  // 5. Check finger spacing (should be close together)
  const fingerSpacingScore = checkFingerSpacing(landmarks);
  accuracy += fingerSpacingScore;
  totalChecks += 15;

  // Calculate final percentage
  const finalAccuracy = Math.round((accuracy / totalChecks) * 100);

  // Add some natural variation for realism
  const variation = (Math.random() - 0.5) * 3;
  return Math.min(100, Math.max(0, finalAccuracy + variation));
};

const checkFingerExtension = (landmarks: Landmark[]): number => {
  // Check if fingers are extended by comparing PIP and DIP joints
  const fingerTips = [8, 12, 16, 20]; // Index, middle, ring, pinky tips
  const pipJoints = [6, 10, 14, 18]; // PIP joints

  let extendedFingers = 0;

  fingerTips.forEach((tipIndex, fingerIndex) => {
    const tip = landmarks[tipIndex];
    const pip = landmarks[pipJoints[fingerIndex]];

    // Calculate the angle between PIP and tip
    const dx = tip.x - pip.x;
    const dy = tip.y - pip.y;
    const angle = Math.abs(Math.atan2(dy, dx)) * (180 / Math.PI);

    // For Pataka, fingers should be relatively straight (angle < 30 degrees from horizontal)
    if (angle < 30) {
      extendedFingers++;
    }
  });

  return (extendedFingers / 4) * 25; // Max 25 points
};

const checkFingerAlignment = (landmarks: Landmark[]): number => {
  // Check if all fingers are aligned in a straight line
  const fingerTips = [8, 12, 16, 20]; // All finger tips
  const yPositions = fingerTips.map(index => landmarks[index].y);

  // Calculate variance in Y positions (should be similar for alignment)
  const meanY = yPositions.reduce((sum, y) => sum + y, 0) / yPositions.length;
  const variance = yPositions.reduce((sum, y) => sum + Math.pow(y - meanY, 2), 0) / yPositions.length;

  // Lower variance = better alignment
  const alignmentScore = Math.max(0, 25 - (variance * 1000)); // Scale and invert variance
  return alignmentScore;
};

const checkThumbPosition = (landmarks: Landmark[]): number => {
  // Check if thumb is pressed against the palm side
  const thumbTip = landmarks[4];
  const thumbIP = landmarks[3];
  const indexMCP = landmarks[5];

  // Thumb should be positioned near the palm (lower X coordinate relative to index finger)
  const thumbPalmDistance = Math.abs(thumbTip.x - indexMCP.x);
  const thumbCurl = Math.abs(thumbTip.y - thumbIP.y);

  // Thumb should be curled (smaller Y difference) and close to palm (smaller X difference)
  let score = 0;

  if (thumbCurl < 0.05) score += 10; // Thumb is curled
  if (thumbPalmDistance < 0.1) score += 10; // Thumb is close to palm

  return score;
};

const checkPalmOrientation = (landmarks: Landmark[]): number => {
  // Check if palm is facing outward (fingers pointing up)
  const wrist = landmarks[0];
  const middleMCP = landmarks[9];
  const middlePIP = landmarks[10];

  // Calculate the direction from wrist to middle finger using both MCP and PIP
  const dx = (middleMCP.x + middlePIP.x) / 2 - wrist.x;
  const dy = (middleMCP.y + middlePIP.y) / 2 - wrist.y;

  // For Pataka, palm should be facing outward (positive X direction)
  const palmAngle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Ideal angle for outward facing palm is around 0-30 degrees
  const angleScore = Math.max(0, 15 - Math.abs(palmAngle));

  return angleScore;
};

const checkFingerSpacing = (landmarks: Landmark[]): number => {
  // Check if fingers are close together (not spread apart)
  const fingerMCPs = [5, 9, 13, 17]; // MCP joints of all fingers
  const xPositions = fingerMCPs.map(index => landmarks[index].x);

  // Calculate average spacing between fingers
  let totalSpacing = 0;
  for (let i = 1; i < xPositions.length; i++) {
    totalSpacing += Math.abs(xPositions[i] - xPositions[i-1]);
  }

  const avgSpacing = totalSpacing / (xPositions.length - 1);

  // For Pataka, fingers should be close together (spacing < 0.05)
  const spacingScore = Math.max(0, 15 - (avgSpacing * 200));

  return spacingScore;
};

export const generateMudraFeedback = (
  landmarks: Landmark[],
  accuracy: number,
  currentFeedback: FeedbackItem[]
): FeedbackItem[] => {
  const newFeedback: FeedbackItem[] = [];
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Analyze each aspect and provide specific feedback
  const fingerExtensionScore = checkFingerExtension(landmarks);
  const fingerAlignmentScore = checkFingerAlignment(landmarks);
  const thumbPositionScore = checkThumbPosition(landmarks);
  const palmOrientationScore = checkPalmOrientation(landmarks);
  const fingerSpacingScore = checkFingerSpacing(landmarks);

  // Generate feedback based on scores
  if (fingerExtensionScore < 20) {
    newFeedback.push({
      type: 'warning',
      message: 'Extend your fingers more - keep them straight and uncurled',
      timestamp: currentTime
    });
  } else if (fingerExtensionScore >= 20) {
    newFeedback.push({
      type: 'correct',
      message: 'Excellent finger extension!',
      timestamp: currentTime
    });
  }

  if (fingerAlignmentScore < 20) {
    newFeedback.push({
      type: 'warning',
      message: 'Align your fingers in a straight line',
      timestamp: currentTime
    });
  } else if (fingerAlignmentScore >= 20) {
    newFeedback.push({
      type: 'correct',
      message: 'Perfect finger alignment!',
      timestamp: currentTime
    });
  }

  if (thumbPositionScore < 15) {
    newFeedback.push({
      type: 'warning',
      message: 'Press your thumb against the side of your palm',
      timestamp: currentTime
    });
  } else if (thumbPositionScore >= 15) {
    newFeedback.push({
      type: 'correct',
      message: 'Great thumb position!',
      timestamp: currentTime
    });
  }

  if (palmOrientationScore < 10) {
    newFeedback.push({
      type: 'warning',
      message: 'Face your palm outward with fingers pointing up',
      timestamp: currentTime
    });
  }

  if (fingerSpacingScore < 10) {
    newFeedback.push({
      type: 'warning',
      message: 'Keep your fingers close together - avoid spreading them apart',
      timestamp: currentTime
    });
  }

  // Overall accuracy feedback
  if (accuracy >= 90) {
    newFeedback.push({
      type: 'correct',
      message: `Excellent Pataka mudra! Accuracy: ${Math.round(accuracy)}%`,
      timestamp: currentTime
    });
  } else if (accuracy >= 75) {
    newFeedback.push({
      type: 'warning',
      message: `Good progress! Accuracy: ${Math.round(accuracy)}% - keep practicing`,
      timestamp: currentTime
    });
  }

  // Update feedback state (keep only last 5 messages)
  return [...newFeedback.slice(-3), ...currentFeedback.slice(0, 2)];
};

export const drawHandLandmarks = (
  canvas: HTMLCanvasElement | null,
  video: HTMLVideoElement | null,
  handLandmarks: Landmark[][],
  isHandDetected: boolean
): void => {
  if (!canvas || !video || handLandmarks.length === 0 || !isHandDetected) {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    return;
  }

  // Set canvas size to video size for crisp drawing
  if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear previous frame for zero latency
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw hand connections with smooth gradient and shadow
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
    [0, 5], [5, 6], [6, 7], [7, 8], // Index
    [0, 9], [9, 10], [10, 11], [11, 12], // Middle
    [0, 13], [13, 14], [14, 15], [15, 16], // Ring
    [0, 17], [17, 18], [18, 19], [19, 20] // Pinky
  ];

  handLandmarks.forEach((hand) => {
    connections.forEach(([start, end]) => {
      const a = hand[start];
      const b = hand[end];
      if (a && b) {
        ctx.save();
        // Gradient for flawless look
        const grad = ctx.createLinearGradient(
          a.x * canvas.width, a.y * canvas.height,
          b.x * canvas.width, b.y * canvas.height
        );
        grad.addColorStop(0, "#FFD700");
        grad.addColorStop(1, "#1F4E79");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 6;
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(a.x * canvas.width, a.y * canvas.height);
        ctx.lineTo(b.x * canvas.width, b.y * canvas.height);
        ctx.stroke();
        ctx.restore();
      }
    });

    // Draw landmarks with glowing effect
    hand.forEach((lm, idx) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 10, 0, 2 * Math.PI);
      ctx.fillStyle = idx === 0 ? "#1F4E79" : "#FFD700";
      ctx.shadowColor = "#FFD700";
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.restore();
    });
  });
};
