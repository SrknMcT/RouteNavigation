package com.routenavigation;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Navigation")
public class NavigationPlugin extends Plugin {

    Implementation implementation;
    String navigationStatus = "notAssignedYet";

    @Override
    public void load() {
        implementation = Implementation.getInstance();
    }

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void startNavigation(PluginCall call) {

        call.setKeepAlive(true);
        String pointStart = call.getString("valueS");
        String pointDestination = call.getString("valueE");
        String publicKey = call.getString("valueKey");

        Context mContext = getContext();
        Intent myIntent = new Intent(mContext, TurnByTurnExperienceActivity.class);
        myIntent.putExtra("pointStartToParse", pointStart);
        myIntent.putExtra("pointEndToParse", pointDestination);
        myIntent.putExtra("publicKey", publicKey);

        //myIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        //mContext.startActivity(myIntent);

        // Start the Activity for result using the name of the callback method
        startActivityForResult(call, myIntent, "echoResult");

        //navigation un sadece belli statüleri için geri dönüş yapılabilir.
        //notifyListeners("navigationStatusEvent",ret);

        Log.i("navigationstatus: ", navigationStatus);

        echoNavigationStatus(call, navigationStatus);
    }

    @ActivityCallback
    private void echoResult(PluginCall call, ActivityResult result) {

        if (call == null) {
            return;
        }

        Log.i("code", String.valueOf(result.getResultCode()));

        //Now You are not on navigation screen now.
        navigationStatus = "notInNavigationScreen";

        echoNavigationStatus(call, navigationStatus);
    }


    public void setNavigationStatus(String navigationStatus) {
        this.navigationStatus = navigationStatus;

    }

    private void echoNavigationStatus(final PluginCall call, String navigationStatus) {
        implementation.requestUpdates(new NavigationResultCallback() {
            @Override
            public void onStatusChanged(String navigationStatus) {
                JSObject ret = new JSObject();
                ret.put("navigationstatus", navigationStatus);
                call.resolve(ret);
            }
        }, navigationStatus);

    }

}