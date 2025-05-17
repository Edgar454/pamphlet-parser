import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import Header from '@/components/ui/Header';
import { Github as GitHub, Mail, Globe, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function AboutScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Header title="About" />
      
      <ScrollView style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/721171/pexels-photo-721171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.logo}
          />
          <Text style={styles.title}>Church Registration App</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About This App</Text>
          <Text style={styles.description}>
            This app automates the registration process for new church members.
            It uses AI to extract data from registration forms, making the process
            faster and more efficient. Church officials can capture, review, and
            save member information with just a few taps.
          </Text>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Features</Text>
          
          <View style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Document scanning with AI-powered data extraction</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Data verification and editing</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Secure cloud storage with Supabase</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Comprehensive analytics and reporting</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Contact & Support</Text>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openLink('https://github.com/Edgar454')}
          >
            <GitHub size={20} color={Colors.gray[700]} />
            <Text style={styles.contactText}>GitHub: Edgar454</Text>
            <ChevronRight size={16} color={Colors.gray[400]} style={styles.chevron} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => Linking.openURL('mailto:support@churchapp.com')}
          >
            <Mail size={20} color={Colors.gray[700]} />
            <Text style={styles.contactText}>support@churchapp.com</Text>
            <ChevronRight size={16} color={Colors.gray[400]} style={styles.chevron} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openLink('https://churchapp.com')}
          >
            <Globe size={20} color={Colors.gray[700]} />
            <Text style={styles.contactText}>www.churchapp.com</Text>
            <ChevronRight size={16} color={Colors.gray[400]} style={styles.chevron} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 Church Registration App. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    color: Colors.gray[800],
    marginBottom: 4,
  },
  version: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.gray[500],
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: Colors.gray[800],
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.gray[700],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginRight: 12,
  },
  featureText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.gray[700],
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  contactText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.gray[700],
    marginLeft: 12,
    flex: 1,
  },
  chevron: {
    marginLeft: 'auto',
  },
  footer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: Colors.gray[500],
    textAlign: 'center',
  },
});