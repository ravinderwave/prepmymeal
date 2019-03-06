<?php

namespace App\Http\Controllers\backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Component;

/**
 * Class ComponentController
 * @package App\Http\Controllers
 */
class ComponentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $components = Component::all();
        return view('backend.components.index')->withComponents($components);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('backend.components.create');
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
            'weight' => 'required|numeric|gt:0',
            'price' => 'required|numeric|gt:0',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $image = 'components_'.uniqid().'.'.$request->image->getClientOriginalExtension();
            $request->image->move(public_path('uploads'), $image);
        }else{
            $image = null;
        }

        $component = new Component;
        $component->title = $request->title;
        $component->weight = $request->weight;
        $component->type = $request->type;
        $component->price = $request->price;
        $component->ntr_options = json_encode($request->ntr);
        $component->image = $image;        
        $component->save();

        return redirect()->route('components.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Component $component)
    {
        if ($component->status=='1'){
            $component->status='0';
        }else{
            $component->status='1';
        }
        $component->save();
        return redirect()->route('components.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $component = Component::find($id);
        return view('backend.components.edit')->withComponent($component);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Component $component)
    {
        $this->validate($request,[
            'title' => 'required',
            'weight' => 'required|numeric|gt:0',
            'price' => 'required|numeric|gt:0',
            'image' => 'sometimes|required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $image = 'components_'.uniqid().'.'.$request->image->getClientOriginalExtension();
            $request->image->move(public_path('uploads'), $image);
        }else{
            $image = $request->image;
        }

        $component->title = $request->title;
        $component->weight = $request->weight;
        $component->type = $request->type;
        $component->price = $request->price;
        $component->ntr_options = json_encode($request->ntr);
        $component->image = $image;        
        $component->save();

        return redirect()->route('components.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Component $component)
    {
        $component->delete();
        return redirect()->route('components.index');
    }
}
