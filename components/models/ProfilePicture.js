// Library import
import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ActionSheet from "react-native-actions-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";

// Custom import
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import AText from "../common/AText";
import strings from "../../i18n/strings";

const ProfilePicture = (props) => {
  const { SheetRef, onPressCamera, onPressGallery } = props;
  const colors = useSelector((state) => state.theme.theme);

  return (
    <ActionSheet
      ref={SheetRef}
      isGestureEnabled={true}
      indicatorStyle={{ width: moderateScale(100) }}
      containerStyle={[
        localStyles.actionSheetContainer,
        { backgroundColor: colors.background },
      ]}
    >
      <View style={localStyles.bottomContainer}>
        <AText type={"M24"}>{strings.uploadProfilePicture}</AText>

        <TouchableOpacity
          style={[
            localStyles.contextContainer,
            { borderColor: colors.primary },
          ]}
          onPress={onPressCamera}
        >
          <Ionicons
            name="camera-outline"
            size={moderateScale(26)}
            color={colors.textColor}
            style={styles.mr5}
          />
          <AText type={"s18"} style={styles.ml10}>
            {strings.takeAPicture}
          </AText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            localStyles.contextContainer,
            { borderColor: colors.primary },
          ]}
          onPress={onPressGallery}
        >
          <Ionicons
            name="image-outline"
            size={moderateScale(26)}
            color={colors.textColor}
            style={styles.mr5}
          />
          <AText type={"s18"} style={styles.ml10}>
            {strings.chooseFromGallery}
          </AText>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

const localStyles = StyleSheet.create({
  actionSheetContainer: {
    ...styles.p20,
  },
  contextContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.mt20,
    ...styles.p15,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(15),
  },
  bottomContainer: {
    width: "100%",
    ...styles.selfCenter,
    paddingHorizontal: moderateScale(40),
    ...styles.mv30,
  },
});

export default ProfilePicture;
