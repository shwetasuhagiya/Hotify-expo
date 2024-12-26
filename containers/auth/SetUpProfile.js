// Libraries import
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { createRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MaterialIcon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import * as ImageCropPicker from "expo-image-picker";

// Local import
import ASafeAreaView from "../../components/common/ASafeAreaView";
import AHeader from "../../components/common/AHeader";
import strings from "../../i18n/strings";
import images from "../../assets/images";
import { styles } from "../../themes";
import { GenderData, moderateScale } from "../../common/constants";
import AInput from "../../components/common/AInput";
import AKeyBoardAvoidWrapper from "../../components/common/AKeyBoardAvoidWrapper";
import { StackNav } from "../../navigation/NavigationKeys";
import AButton from "../../components/common/AButtton";
import ProfilePicture from "../../components/models/ProfilePicture";

const SetUpProfile = (props) => {
  const { navigation } = props;
  const headerTitle = props.route.params.title;

  const colors = useSelector((state) => state.theme.theme);
  const ProfilePictureSheetRef = createRef();

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.btnColor1,
  };
  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary,
  };
  const BlurredIconStyle = colors.grayScale5;
  const FocusedIconStyle = colors.primary;

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [emailInputStyle, setEmailInputStyle] = useState(BlurredStyle);
  const [fullNameInputStyle, setFullNameInputStyle] = useState(BlurredStyle);
  const [phoneNoInputStyle, setPhoneNoInputStyle] = useState(BlurredStyle);
  const [nicknameInputStyle, setNicknameInputStyle] = useState(BlurredStyle);
  const [emailIcon, setEmailIcon] = useState(BlurredIconStyle);
  const [selectImage, setSelectImage] = useState("");

  const onFocusInput = (onHighlight) => onHighlight(FocusedStyle);
  const onFocusIcon = (onHighlight) => onHighlight(FocusedIconStyle);
  const onBlurInput = (onUnHighlight) => onUnHighlight(BlurredStyle);
  const onBlurIcon = (onUnHighlight) => onUnHighlight(BlurredIconStyle);

  const onFocusEmail = () => {
    onFocusInput(setEmailInputStyle);
    onFocusIcon(setEmailIcon);
  };
  const onBlurEmail = () => {
    onBlurInput(setEmailInputStyle);
    onBlurIcon(setEmailIcon);
  };

  const onFocusFullName = () => onFocusInput(setFullNameInputStyle);
  const onFocusNickName = () => onFocusInput(setNicknameInputStyle);
  const onFocusPhoneNo = () => onFocusInput(setPhoneNoInputStyle);

  const onBlurFullName = () => onBlurInput(setFullNameInputStyle);
  const onBlurNickName = () => onBlurInput(setNicknameInputStyle);
  const onBlurPhoneNo = () => onBlurInput(setPhoneNoInputStyle);

  const onChangedFullName = (text) => setFullName(text);
  const onChangedNickName = (text) => setNickname(text);
  const onChangedPhoneNo = (text) => setPhoneNo(text);
  const onChangedEmail = (text) => setEmail(text);
  const onChangedGender = (text) => setGender(text.value.toLowerCase());

  useEffect(() => {
    ProfilePictureSheetRef?.current?.hide();
  }, [selectImage]);

  const onPressCamera = async () => {
    let result = await ImageCropPicker.launchCameraAsync({
      mediaTypes: ImageCropPicker.MediaTypeOptions.Images,
      base64: true,
    });
    if (result?.assets && result.assets.length > 0) {
      const images = result.assets[0];
      ProfilePictureSheetRef?.current?.hide();
      setSelectImage(images);
    }
  };

  const onPressGallery = async () => {
    const { status } =
      await ImageCropPicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
    }
    let result = await ImageCropPicker.launchImageLibraryAsync({
      mediaTypes: ImageCropPicker.MediaTypeOptions.All,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (result?.assets && result.assets.length > 0) {
      const images = result.assets[0];
      ProfilePictureSheetRef?.current?.hide();
      setSelectImage(images);
    }
  };

  const EmailIcon = () => (
    <Ionicons name="mail" size={moderateScale(20)} color={emailIcon} />
  );

  const CountryIcon = () => {
    return (
      <Ionicons
        name="flag"
        size={moderateScale(20)}
        color={colors.grayScale5}
      />
    );
  };

  const onPressUpdate = () => {};

  const onPressContinue = () => navigation.navigate(StackNav.SetPin);

  const onPressSkip = () => navigation.navigate(StackNav.SetPin);

  const onPressProfilePic = () => ProfilePictureSheetRef?.current.show();

  return (
    <ASafeAreaView>
      <AHeader title={headerTitle} />
      <AKeyBoardAvoidWrapper containerStyle={[styles.p20]}>
        <TouchableOpacity
          onPress={onPressProfilePic}
          style={[styles.selfCenter, styles.mb20]}
        >
          {!!selectImage?.uri ? (
            <Image
              source={{ uri: selectImage?.uri }}
              style={localStyles.userImage}
            />
          ) : (
            <Image
              source={colors.dark ? images.userDark : images.userLight}
              style={localStyles.userImage}
            />
          )}
          <MaterialIcon
            name="pencil-box"
            size={moderateScale(30)}
            color={colors.primary}
            style={localStyles.editIcon}
          />
        </TouchableOpacity>

        <AInput
          placeHolder={strings.fullName}
          keyBoardType={"email-address"}
          _value={fullName}
          autoCapitalize={"none"}
          toGetTextFieldValue={onChangedFullName}
          inputContainerStyle={[
            { backgroundColor: colors.inputBg },
            localStyles.inputContainerStyle,
            fullNameInputStyle,
          ]}
          _onFocus={onFocusFullName}
          onBlur={onBlurFullName}
        />
        <AInput
          placeHolder={strings.nickname}
          _value={nickname}
          autoCapitalize={"none"}
          toGetTextFieldValue={onChangedNickName}
          inputContainerStyle={[
            { backgroundColor: colors.inputBg },
            localStyles.inputContainerStyle,
            nicknameInputStyle,
          ]}
          _onFocus={onFocusNickName}
          onBlur={onBlurNickName}
        />
        <AInput
          placeHolder={strings.email}
          keyBoardType={"email-address"}
          _value={email}
          autoCapitalize={"none"}
          toGetTextFieldValue={onChangedEmail}
          rightAccessory={() => <EmailIcon />}
          inputContainerStyle={[
            { backgroundColor: colors.inputBg },
            localStyles.inputContainerStyle,
            emailInputStyle,
          ]}
          _onFocus={onFocusEmail}
          onBlur={onBlurEmail}
        />
        <AInput
          placeHolder={strings.phoneNumber}
          keyBoardType={"number-pad"}
          _value={phoneNo}
          _maxLength={10}
          toGetTextFieldValue={onChangedPhoneNo}
          insideLeftIcon={() => <CountryIcon />}
          inputContainerStyle={[
            { backgroundColor: colors.inputBg },
            localStyles.inputContainerStyle,
            phoneNoInputStyle,
          ]}
          _onFocus={onFocusPhoneNo}
          onBlur={onBlurPhoneNo}
        />

        <Dropdown
          style={[
            localStyles.dropdownStyle,
            {
              backgroundColor: colors.inputBg,
              borderColor: colors.inputBg,
              color: colors.whiteColor,
            },
          ]}
          placeholderStyle={{ color: colors.grayScale5 }}
          data={GenderData}
          maxHeight={moderateScale(180)}
          labelField="label"
          valueField="value"
          placeholder={strings.gender}
          value={gender}
          itemTextStyle={{
            color: colors.textColor,
            fontSize: moderateScale(16),
          }}
          onChange={onChangedGender}
          selectedTextStyle={{
            color: colors.textColor,
          }}
          itemContainerStyle={{
            backgroundColor: colors.inputBg,
          }}
          activeColor={colors.inputBg}
        />
      </AKeyBoardAvoidWrapper>
      {!!(headerTitle === strings.editProfile) ? (
        <AButton
          textType={"b18"}
          color={colors.whiteColor}
          title={strings.update}
          onPress={onPressUpdate}
          containerStyle={styles.m20}
        />
      ) : (
        <View style={localStyles.btnContainer}>
          <AButton
            title={strings.skip}
            textType={"b18"}
            color={colors.dark ? colors.whiteColor : colors.primary}
            containerStyle={[localStyles.skipBtnContainer]}
            bgColor={colors.dark3}
            onPress={onPressSkip}
          />
          <AButton
            title={strings.continue}
            textType={"b18"}
            color={colors.whiteColor}
            containerStyle={[localStyles.skipBtnContainer]}
            onPress={onPressContinue}
          />
        </View>
      )}
      <ProfilePicture
        onPressCamera={onPressCamera}
        onPressGallery={onPressGallery}
        SheetRef={ProfilePictureSheetRef}
      />
    </ASafeAreaView>
  );
};

export default SetUpProfile;

const localStyles = StyleSheet.create({
  userImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  inputContainerStyle: {
    height: moderateScale(60),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  dropdownStyle: {
    height: moderateScale(60),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
    ...styles.ph25,
    ...styles.mt15,
  },
  btnContainer: {
    ...styles.p20,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: "45%",
  },
});
