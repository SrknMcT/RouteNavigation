package com.routenavigation;

import android.content.Context;

public class Implementation {

    private NavigationResultCallback navigationResultCallbackImpl;
    private static Implementation implementation = null;

    public static Implementation getInstance()
    {
        if(implementation==null)
            implementation=new Implementation();
        return  implementation;

    }

    public NavigationResultCallback getNavigationResultCallbackImpl() {
        return navigationResultCallbackImpl;
    }


    public void setNavigationResultCallbackImpl(NavigationResultCallback navigationResultCallbackImpl) {
        this.navigationResultCallbackImpl = navigationResultCallbackImpl;
    }

    public void requestUpdates(NavigationResultCallback navigationResultCallback, String navigationStatus)
    {
        navigationResultCallback.onStatusChanged(navigationStatus);
        setNavigationResultCallbackImpl(navigationResultCallback);
    }

}
