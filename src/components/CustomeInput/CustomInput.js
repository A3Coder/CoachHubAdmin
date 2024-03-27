// CustomInput.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { Controller } from 'react-hook-form';

const CustomInput = ({ control, name, placeholder, securityTextEntry, rules = {}, onChange2, maxLength: propMaxLength,isPasswordConfirm,isOldPassword,isNewPassword }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!securityTextEntry);
  const isPassword = name === "password" ||isPasswordConfirm||isOldPassword||isNewPassword; // Check if it's the password field

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const getMaxLength = () => {
    // Use propMaxLength if provided, otherwise, default to undefined
    return propMaxLength !== undefined && isPassword ? Math.min(propMaxLength, 16) : propMaxLength;
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[
            styles.container,
            { borderColor: error ? 'red' : '#e8e8e8' },
          ]}>
            <TextInput
              placeholderTextColor="black"
              value={value}
              onChangeText={(text) => {
                const maxLength = getMaxLength();
                if (isPassword && text.length > maxLength) {
                  return; // Skip setting value for password beyond max length
                }
                onChange(text);
              }}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={isPassword && !isPasswordVisible}
              onChange={onChange2}
              maxLength={getMaxLength()} // Set max length dynamically
              keyboardType={rules.numPattern ? 'numeric' : 'default'}
            />
            {isPassword && (
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                <Ionicons name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
          {error && (
            <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'black',
  },
  iconContainer: {
    padding: 10,
  },
});

export default CustomInput;
