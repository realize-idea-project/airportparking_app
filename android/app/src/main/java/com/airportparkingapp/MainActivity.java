package com.airportparkingapp;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import com.tkporter.sendsms.SendSMSPackage;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  @Override
  protected String getMainComponentName() {
    return "airportParkingApp";
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    //probably some other stuff here
    SendSMSPackage.getInstance().onActivityResult(requestCode, resultCode, data);
  }
}
