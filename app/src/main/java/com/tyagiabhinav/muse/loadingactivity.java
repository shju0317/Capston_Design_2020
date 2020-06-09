package com.tyagiabhinav.muse;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.WindowManager;
import android.widget.ProgressBar;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class loadingactivity extends AppCompatActivity {
    int SPLASH_TIME_OUT = 5000;
    ProgressBar progressBar;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.loading);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent home = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(home);
                finish();
            }
        },SPLASH_TIME_OUT);

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        progressBar = findViewById(R.id.progressBar);

        progressAnimation();
    }

    public void progressAnimation(){
        loading anim = new loading(this, progressBar, 0f, 100f);
        anim.setDuration(2000);
        progressBar.setAnimation(anim);
    }
}

