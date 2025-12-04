import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { injury, difficulty, activityLevel, targetZones } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("AI Coach request:", { injury, difficulty, activityLevel, targetZones });

    const systemPrompt = `You are an expert Physiotherapist and Decathlon Product Specialist.
Act as a friendly AI coach providing personalized safety advice for workouts.
Always be encouraging but prioritize safety.
Keep responses concise and actionable.`;

    const userPrompt = `User Profile:
- Injury/Constraint: ${injury || "None"}
- Activity Level: ${activityLevel || "Not specified"}
- Target Zones: ${targetZones?.join(", ") || "Full body"}

Task: Provide a personalized safety brief with:
1. A 2-sentence specific safety tip for this user during their workout
2. One recommended type of equipment from Decathlon (e.g., "Knee Support", "Yoga Block", "Resistance Band")
3. A short motivational quote (max 10 words)

Output Format (strictly JSON):
{
  "safetyTip": "Your advice here.",
  "gearRecommendation": "Product Category Name",
  "motivationalQuote": "Short punchy quote."
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("AI response content:", content);

    // Parse JSON from response (handle markdown code blocks)
    let parsedContent;
    try {
      const cleanedContent = content.replace(/```json\n?|```/g, "").trim();
      parsedContent = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback response
      parsedContent = {
        safetyTip: "Listen to your body and stop if you feel any pain. Start slowly and maintain proper form throughout.",
        gearRecommendation: "Yoga Mat",
        motivationalQuote: "Progress, not perfection!"
      };
    }

    return new Response(JSON.stringify(parsedContent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("AI Coach error:", error);
    return new Response(
      JSON.stringify({ 
        safetyTip: "Always warm up before exercising and maintain proper posture.",
        gearRecommendation: "Exercise Mat",
        motivationalQuote: "Every step counts!"
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
