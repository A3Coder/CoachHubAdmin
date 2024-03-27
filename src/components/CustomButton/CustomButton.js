import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor, fgColor, text2, Icon, disabled,onPress2 }) => {
  const getButtonStyles = () => {
    // Add more styles based on the type if needed
    const buttonStyles = [styles.container, styles[`container_${type}`]];

    if (bgColor) {
      buttonStyles.push({ backgroundColor: bgColor });
    }

    if (disabled && type !== 'TERTIARY') {
      // Apply different styles for disabled state
      buttonStyles.push(styles.containerDisabled);
    }

    return buttonStyles;
  };

  const getTextStyles = () => {
    // Add more styles based on the type if needed
    const textStyles = [styles.text, styles[`text_${type}`]];

    if (fgColor) {
      textStyles.push({ color: fgColor });
    }

    if (disabled) {
      // Apply different styles for disabled state
      textStyles.push(styles.textDisabled);
    }

    return textStyles;
  };

  return (
    <TouchableOpacity onPress={onPress} onPressOut={onPress2} disabled={disabled} style={getButtonStyles()}>
      <View style={styles.contentContainer}>
        {Icon && (
          <View style={styles.Icon}>
            {Icon}
          </View>
        )}
        <Text style={getTextStyles()}>
          {text}
          <Text style={{ color: '#3B71F3' }}>{text2}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical:5,
    alignItems: 'center',
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: '#2855AE',
  },
  container_SECONDRY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },
  container_TERTIARY: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignItems: 'flex-end',
  },
  containerDisabled: {
    backgroundColor: '#ccc', // Adjust the color for disabled state
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
  textDisabled: {
    color: '#666', // Adjust the color for disabled state
  },
  text_TERTIARY: {
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize:16,
    fontWeight:'400'
  },
  text_TERTIARY2: {
    color: 'grey',
  },
  text_SECONDRY: {
    color: '#3B71F3',
  },
  Icon: {
    marginRight: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomButton;
