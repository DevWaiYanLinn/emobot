interface Emotion {
    angry: number;
    disgust: number;
    fear: number;
    happy: number;
    sad: number;
    surprise: number;
    neutral: number;
}

interface Region {
    x: number;
    y: number;
    w: number;
    h: number;
    left_eye: [number, number];
    right_eye: [number, number];
}

interface FaceData {
    emotion: Emotion;
    dominant_emotion: string;
    region: Region;
    face_confidence: number;
}


interface Retangle {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface Faces {
    data: Array<FaceData>;
    status: 'PENDING' | 'ERROR' | 'SUCCESS';
    message: string | null;
}