import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type RecentItemProps = {
  item: any;
  onPress: () => void;
};

export default function RecentItem({ item, onPress }: RecentItemProps) {
  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {item.prenom || ''} {item.nom || ''}
          </Text>
          {item.nationalite && (
            <Text style={styles.nationality}>{item.nationalite}</Text>
          )}
        </View>
        
        <View style={styles.detailsContainer}>
          {item.telephone && (
            <Text style={styles.detail}>{item.telephone}</Text>
          )}
          {item.email && (
            <Text style={styles.detail}>{item.email}</Text>
          )}
          {item.quartier && (
            <Text style={styles.detail}>{item.quartier}</Text>
          )}
        </View>
        
        <View style={styles.footer}>
          {item.created_at && (
            <Text style={styles.date}>
              Added: {formatDate(item.created_at)}
            </Text>
          )}
          
          {item.baptise && (
            <View style={[
              styles.badge,
              item.baptise.toLowerCase() === 'yes' || 
              item.baptise.toLowerCase() === 'true' ? 
                styles.baptizedBadge : 
                styles.notBaptizedBadge
            ]}>
              <Text style={[
                styles.badgeText,
                item.baptise.toLowerCase() === 'yes' || 
                item.baptise.toLowerCase() === 'true' ? 
                  styles.baptizedText : 
                  styles.notBaptizedText
              ]}>
                {item.baptise.toLowerCase() === 'yes' || 
                 item.baptise.toLowerCase() === 'true' ? 
                  'Baptized' : 'Not Baptized'}
              </Text>
            </View>
          )}
        </View>
      </View>
      
      <ChevronRight size={20} color={Colors.gray[400]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  content: {
    flex: 1,
  },
  nameContainer: {
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: 2,
  },
  nationality: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.gray[600],
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: Colors.gray[600],
    marginBottom: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: Colors.gray[500],
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  baptizedBadge: {
    backgroundColor: Colors.success + '20', // 20% opacity
  },
  notBaptizedBadge: {
    backgroundColor: Colors.gray[200],
  },
  badgeText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
  },
  baptizedText: {
    color: Colors.success,
  },
  notBaptizedText: {
    color: Colors.gray[600],
  },
});