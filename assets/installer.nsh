!macro customInstall
  # Extract Node.js MSI installer to user's temp directory
  SetOutPath "$TEMP"
  File "${BUILD_RESOURCES_DIR}\..\nodejs\node.msi"
  
  # Launch Node.js installer and wait for it to complete
  ExecShell "open" "$TEMP\node.msi"
  MessageBox MB_OK "Please complete the Node.js installation first, then click OK to continue."
  
  # No need to copy backend files here as they will be in resources folder
  
  # Create startup entry for the server
  CreateShortCut "$SMSTARTUP\KSB-MERP-Server.lnk" "$INSTDIR\KSB-MERP.exe" "" "$INSTDIR\assets\ksb.ico"
!macroend

!macro customUnInstall
  # Remove startup shortcut
  Delete "$SMSTARTUP\KSB-MERP-Server.lnk"
!macroend
