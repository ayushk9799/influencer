import React from 'react';
import './DetailedCampaign.css'
const DetailedCampaign = () => {
  return (
    <div>
      <main className="container">
        <div className="grid">
          <div className="space-y-6">
            <h1>Unleash Your Social Media Dominance</h1>
            <p>
              Supercharge your online presence with our cutting-edge social media campaign. Reach new heights and
              captivate your target audience like never before.
            </p>
            <div className="grid-cols-2">
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <h3>Target Platform</h3>
                <p className="text-muted-foreground">Instagram, TikTok, Twitter</p>
              </div>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <h3>Funding Amount</h3>
                <p className="text-muted-foreground">$50,000</p>
              </div>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <h3>Target Gender</h3>
                <p className="text-muted-foreground">18-35 Female</p>
              </div>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <h3>Follower Count</h3>
                <p className="text-muted-foreground">10,000+</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg"
              width="800"
              height="450"
              alt="Campaign Showcase"
            />
          </div>
        </div>
        <div className="mt-12 space-y-8">
          <h2>Campaign Description</h2>
          <div className="prose">
            <p>
              {}
           
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailedCampaign;