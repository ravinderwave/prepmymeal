<?php

namespace App\Http\Controllers\backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Component;
use App\Meal;

class MealController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $meals = Meal::all();
        return view('backend.meals.index')->withMeals($meals);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $components = Component::all();
        return view('backend.meals.create')->withComponents($components);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'title' => 'required',
            'slug' => 'required|unique:meals,slug',
            'description' => 'required',
            'short_description' => 'required',
            'sku' => 'required|numeric|gt:0',
            'title' => 'required',
            'saleable' => 'required',
            'price' => 'required|numeric|gt:0',
            'image1' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image1')) {
            $image1 = 'meals_'.uniqid().'.'.$request->image1->getClientOriginalExtension();
            $request->image1->move(public_path('uploads'), $image1);
        }else{
            $image1 = null;
        }

        if ($request->hasFile('image2')) {
            $image2 = 'meals_'.uniqid().'.'.$request->image2->getClientOriginalExtension();
            $request->image2->move(public_path('uploads'), $image2);
        }else{
            $image2 = null;
        }

        $meal = new Meal;
        $meal->title = $request->title;
        $meal->slug = $request->slug;
        $meal->sku = $request->sku;
        $meal->short_description = $request->short_description;
        $meal->description = $request->description;
        $meal->is_sale = $request->saleable;
        $meal->discount_percentage = $request->discount_percentage;
        $meal->type = $request->type;
        $meal->price = $request->price;
        $meal->meal_options = (count($request->mbc)>1)?json_encode($request->mbc):null;
        $meal->ntr_options = ($request->type=='0')?json_encode($request->ntr):null;
        $meal->image1 = $image1;
        $meal->image2 = $image2;
        $meal->mtitle = $request->mtitle;
        $meal->mdesc = $request->mdesc;
        $meal->mkey = $request->mkey;
        $meal->save();

        return redirect()->route('meals.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Meal $meal)
    {
        if ($meal->status=='1'){
            $meal->status='0';
        }else{
            $meal->status='1';
        }
        $meal->save();
        return redirect()->route('meals.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $components = Component::all();
        $meal = Meal::find($id);
        return view('backend.meals.edit')->withComponents($components)->withMeal($meal);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Meal $meal)
    {
        $this->validate($request,[
            'title' => 'required',
            'description' => 'required',
            'short_description' => 'required',
            'sku' => 'required|numeric|gt:0',
            'title' => 'required',
            'saleable' => 'required',
            'price' => 'required|numeric|gt:0',
            'image1' => 'sometimes|required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image1')) {
            $image1 = 'meals_'.uniqid().'.'.$request->image1->getClientOriginalExtension();
            $request->image1->move(public_path('uploads'), $image1);
        }else{
            $image1 = $meal->image1;
        }

        if ($request->hasFile('image2')) {
            $image2 = 'meals_'.uniqid().'.'.$request->image2->getClientOriginalExtension();
            $request->image2->move(public_path('uploads'), $image2);
        }else{
            $image2 = $meal->image2;
        }

        $meal->title = $request->title;
        $meal->slug = $request->slug;
        $meal->sku = $request->sku;
        $meal->short_description = $request->short_description;
        $meal->description = $request->description;
        $meal->is_sale = $request->saleable;
        $meal->discount_percentage = $request->discount_percentage;
        $meal->type = $request->type;
        $meal->price = $request->price;
        $meal->meal_options = (count($request->mbc)>1)?json_encode($request->mbc):null;
        $meal->ntr_options = ($request->type=='0')?json_encode($request->ntr):null;
        $meal->image1 = $image1;
        $meal->image2 = $image2;
        $meal->mtitle = $request->mtitle;
        $meal->mdesc = $request->mdesc;
        $meal->mkey = $request->mkey;
        $meal->save();

        return redirect()->route('meals.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Meal $meal)
    {
        $meal->delete();
        return redirect()->route('meals.index');
    }
}
