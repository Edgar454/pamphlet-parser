import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import Colors from '@/constants/Colors';
import { AnimatedView } from '@/components/ui/Animations';

type UploadScreenProps = {
  onImageCaptured: (uri: string) => void;
};

export default function UploadScreen({ onImageCaptured }: UploadScreenProps) {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  let cameraRef: any = null;

  const handleCameraCapture = async () => {
    if (!cameraRef) return;
    
    try {
      const photo = await cameraRef.takePictureAsync();
      setCameraVisible(false);
      onImageCaptured(photo.uri);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const openCamera = async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        return;
      }
    }
    setCameraVisible(true);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onImageCaptured(result.assets[0].uri);
    }
  };

  if (cameraVisible) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          ref={(ref) => (cameraRef = ref)}
          style={styles.camera}
          facing={cameraType}
        >
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => setCameraType(current => (current === 'back' ? 'front' : 'back'))}
            >
              <Text style={styles.flipButtonText}>Flip</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCameraCapture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setCameraVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <AnimatedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image 
            source={{
              uri: 'https://images.pexels.com/photos/163688/jesus-cross-holy-163688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }}
            style={styles.headerImage}
          />
          <View style={styles.overlay} />
          <Text style={styles.title}>Church Registration</Text>
          <Text style={styles.subtitle}>Capture member registration forms</Text>
        </View>
        
        <View style={styles.uploadOptions}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={openCamera}
          >
            <View style={styles.iconContainer}>
              <Camera size={30} color={Colors.primary} />
            </View>
            <Text style={styles.optionTitle}>Take Photo</Text>
            <Text style={styles.optionDescription}>
              Use camera to capture registration form
            </Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity
            style={styles.optionButton}
            onPress={pickImage}
          >
            <View style={styles.iconContainer}>
              <ImageIcon size={30} color={Colors.primary} />
            </View>
            <Text style={styles.optionTitle}>Choose Photo</Text>
            <Text style={styles.optionDescription}>
              Select an existing photo from gallery
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          <Text style={styles.instructionsText}>
            1. Ensure the form is well-lit and all text is visible{'\n'}
            2. Keep the camera steady for clear capture{'\n'}
            3. Make sure all fields are in the frame
          </Text>
        </View>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 16,
  },
  header: {
    height: 180,
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: Colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: Colors.white,
  },
  uploadOptions: {
    flexDirection: 'row',
    padding: 16,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.gray[200],
    marginHorizontal: 16,
  },
  optionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: 8,
    textAlign: 'center',
  },
  optionDescription: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: 'center',
  },
  instructions: {
    padding: 16,
    backgroundColor: Colors.gray[50],
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  instructionsTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: Colors.gray[800],
    marginBottom: 8,
  },
  instructionsText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: Colors.gray[700],
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 20,
  },
  flipButton: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  flipButtonText: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.white,
  },
  cancelButton: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  cancelButtonText: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
});