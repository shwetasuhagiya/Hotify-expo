// library import
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// local import
import {styles} from '../../themes';
import AText from '../common/AText';
import {moderateScale} from '../../common/constants';
import strings from '../../i18n/strings';
import AButton from '../common/AButtton';
import {StackNav} from '../../navigation/NavigationKeys';

const ProfileCard = ({item, index}) => {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();

  const [isFollowing, setIsFollowing] = useState(item?.isFollowing);

  const onFollowPress = () => {
    setIsFollowing(!isFollowing);
    item.isFollowing = !item.isFollowing;
  };

  const navigateToProfileDetail = () => {
    navigation.navigate(StackNav.ProfileDetail, {item: item});
  };

  return (
    <TouchableOpacity
      style={localStyles.root}
      onPress={navigateToProfileDetail}>
      <Image source={item.image} style={localStyles.imageStyle} />
      <View style={[styles.flex, styles.g10, styles.ml15]}>
        <View style={localStyles.nameContainer}>
          <AText type={'B18'} numberOfLines={1}>
            {item.name}
          </AText>
          <AText type={'M12'} color={colors.labelColor} numberOfLines={1}>
            {item.followers} {strings.followers}
          </AText>
        </View>
      </View>
      <AButton
        textType={'S14'}
        onPress={onFollowPress}
        title={isFollowing ? strings.following : strings.follow}
        containerStyle={[
          localStyles.followBtn,
          {
            borderColor: colors.primary,
          },
        ]}
        bgColor={isFollowing ? colors.transparent : colors.primary}
        color={!isFollowing ? colors.whiteColor : colors.primary}
      />
    </TouchableOpacity>
  );
};

export default ProfileCard;

const localStyles = StyleSheet.create({
  root: {
    ...styles.rowSpaceBetween,
    ...styles.mv10,
  },
  imageStyle: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
  },
  followBtn: {
    ...styles.ph15,
    height: moderateScale(36),
    borderWidth: moderateScale(2),
  },
  nameContainer: {
    ...styles.g10,
  },
});